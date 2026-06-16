import { describe, expect, it } from 'vitest';
import { validateDataset } from './dataset';
import { csvToWeapons, parseCsv } from './csv';

describe('validateDataset', () => {
  it('accepts valid items and reports counts', () => {
    const { weapons, platforms, countries, report } = validateDataset(
      {
        weapons: [{ id: 'w1', name: 'W1', category: 'missile', origin: 'XX', range_km: 100 }],
        platforms: [{ id: 'p1', name: 'P1', domain: 'air', type: 'multirole', origin: 'XX', armament: [{ weaponSystemId: 'w1', quantity: 4 }] }],
        countries: [{ id: 'ZZ', name: 'Z', nameKo: '제', region: 'europe', dataTier: 3, hasMilitary: true, airForce: [{ platformId: 'p1', quantity: 10 }] }],
      },
      { weapons: [], platforms: [] }
    );
    expect(weapons).toHaveLength(1);
    expect(platforms).toHaveLength(1);
    expect(countries).toHaveLength(1);
    expect(report.errors).toHaveLength(0);
    expect(report.warnings).toHaveLength(0);
  });

  it('skips invalid rows with errors, keeps valid ones', () => {
    const { weapons, report } = validateDataset(
      {
        weapons: [
          { id: 'ok', name: 'OK', category: 'missile', origin: 'XX' },
          { id: 'bad', name: 'Bad', category: 'not-a-category', origin: 'XX' },
          { name: 'NoId', category: 'gun', origin: 'XX' },
        ],
      },
      { weapons: [], platforms: [] }
    );
    expect(weapons).toHaveLength(1);
    expect(report.errors).toHaveLength(2);
  });

  it('warns on unresolved references but still imports', () => {
    const { platforms, report } = validateDataset(
      { platforms: [{ id: 'p', name: 'P', domain: 'naval', type: 'destroyer', origin: 'XX', armament: [{ weaponSystemId: 'does-not-exist', quantity: 1 }] }] },
      { weapons: [], platforms: [] }
    );
    expect(platforms).toHaveLength(1);
    expect(report.warnings.length).toBeGreaterThan(0);
  });

  it('resolves references against seed catalog (mk41-vls exists)', () => {
    const { report } = validateDataset(
      { platforms: [{ id: 'p', name: 'P', domain: 'naval', type: 'destroyer', origin: 'XX', armament: [{ weaponSystemId: 'mk41-vls', quantity: 32 }] }] },
      { weapons: [], platforms: [] }
    );
    expect(report.warnings).toHaveLength(0);
  });
});

describe('csv', () => {
  it('parses quoted fields with commas', () => {
    const rows = parseCsv('a,b\n"x,y",z\n');
    expect(rows[1]).toEqual(['x,y', 'z']);
  });

  it('maps a weapons CSV into objects with numeric + guidance coercion', () => {
    const objs = csvToWeapons('id,name,category,origin,range_km,guidance\nw,W,missile,XX,100,active-radar|inertial\n') as Record<string, unknown>[];
    expect(objs[0].range_km).toBe(100);
    expect(objs[0].guidance).toEqual(['active-radar', 'inertial']);
  });
});
