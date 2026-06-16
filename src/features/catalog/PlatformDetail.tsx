import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Badge, ConfidenceBadge } from '@/components/ui/Badge';
import { getPlatform, valueOfPlatform } from '@/data';
import { DOMAIN_LABEL, DOMAIN_TYPE_LABEL } from '@/lib/labels';
import { intl, km } from '@/lib/format';
import type { Platform, WeaponSystem } from '@/types';
import { ArmamentView } from './ArmamentView';
import { WeaponDetail } from './WeaponDetail';

// Platform drilldown (spec §4.1, Stage 7). Domain-specific spec grid + full
// armament expansion; weapon rows open the weapon detail on top.
export function PlatformDetail({
  platformId,
  extraPlatforms,
  extraWeapons,
  onClose,
}: {
  platformId: string | null;
  extraPlatforms?: Map<string, Platform>;
  extraWeapons?: Map<string, WeaponSystem>;
  onClose: () => void;
}) {
  const [weaponId, setWeaponId] = useState<string | null>(null);
  const p = platformId ? getPlatform(platformId, extraPlatforms) : undefined;

  return (
    <>
      <Modal
        open={Boolean(platformId)}
        onClose={onClose}
        title={
          p && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-base font-bold text-hud-ink">
                {p.nameKo ?? p.name}
              </span>
              <Badge tone="info">{DOMAIN_TYPE_LABEL[p.type] ?? p.type}</Badge>
              {p.isCustom && <Badge tone="accent">커스텀</Badge>}
              <ConfidenceBadge level={p.dataConfidence} />
            </div>
          )
        }
      >
        {!p ? (
          <p className="text-sm text-hud-ink-soft">플랫폼 정보를 찾을 수 없습니다: {platformId}</p>
        ) : (
          <div className="space-y-5">
            <p className="font-mono text-xs text-hud-ink-soft">
              {p.name} · {DOMAIN_LABEL[p.domain]} · 원산국 {p.origin}
              {p.introduced ? ` · ${p.introduced}년 도입` : ''} · CV{' '}
              <span className="text-hud-accent">{valueOfPlatform(p.id, extraPlatforms, extraWeapons)}</span>
            </p>

            <SpecGrid platform={p} />

            {p.sensors && <Sensors platform={p} />}

            <section>
              <h3 className="hud-label mb-2 text-hud-accent">탑재 무장 (Armament)</h3>
              <ArmamentView platform={p} extraWeapons={extraWeapons} onWeapon={setWeaponId} />
            </section>
          </div>
        )}
      </Modal>

      <WeaponDetail
        weaponId={weaponId}
        extraWeapons={extraWeapons}
        onClose={() => setWeaponId(null)}
      />
    </>
  );
}

function SpecGrid({ platform }: { platform: Platform }) {
  const specs: [string, string][] = [];
  if (platform.domain === 'naval') {
    specs.push(['배수량', `${intl(platform.displacement_t)} t`]);
    if (platform.length_m) specs.push(['전장', `${platform.length_m} m`]);
    if (platform.speed_kn) specs.push(['속력', `${platform.speed_kn} kn`]);
    if (platform.propulsion) specs.push(['추진', platform.propulsion]);
    if (platform.range_nm) specs.push(['항속', `${intl(platform.range_nm)} nm`]);
    if (platform.crew) specs.push(['승조원', intl(platform.crew)]);
    if (platform.aviation) specs.push(['항공기 탑재', `${platform.aviation.capacity}기 (${platform.aviation.types?.join(', ') ?? '-'})`]);
  } else if (platform.domain === 'air') {
    if (platform.generation) specs.push(['세대', platform.generation]);
    if (platform.maxSpeed_mach) specs.push(['최대속도', `Mach ${platform.maxSpeed_mach}`]);
    if (platform.combatRadius_km) specs.push(['전투행동반경', km(platform.combatRadius_km)]);
    if (platform.serviceCeiling_m) specs.push(['실용상승한도', `${intl(platform.serviceCeiling_m)} m`]);
    if (platform.hardpoints) specs.push(['하드포인트', `${platform.hardpoints}개`]);
    if (platform.payload_kg) specs.push(['무장탑재량', `${intl(platform.payload_kg)} kg`]);
  } else {
    if (platform.weight_t) specs.push(['전투중량', `${platform.weight_t} t`]);
    if (platform.armor) specs.push(['장갑', platform.armor]);
    if (platform.engine_hp) specs.push(['엔진출력', `${intl(platform.engine_hp)} hp`]);
    if (platform.speed_kmh) specs.push(['속도', `${platform.speed_kmh} km/h`]);
    if (platform.range_km) specs.push(['항속거리', km(platform.range_km)]);
    if (platform.crew) specs.push(['승무원', intl(platform.crew)]);
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {specs.map(([label, value]) => (
        <div key={label} className="rounded-lg border border-hud-line bg-hud-panel-2/40 px-3 py-2">
          <div className="hud-label mb-0.5">{label}</div>
          <div className="stat-value text-sm text-hud-ink">{value}</div>
        </div>
      ))}
    </div>
  );
}

function Sensors({ platform }: { platform: Platform }) {
  const { radar, sonar, ew } = platform.sensors ?? {};
  const groups: [string, string[] | undefined][] = [
    ['레이더', radar],
    ['소나', sonar],
    ['전자전', ew],
  ];
  const present = groups.filter(([, v]) => v && v.length);
  if (present.length === 0) return null;
  return (
    <section>
      <h3 className="hud-label mb-2 text-hud-accent">센서</h3>
      <div className="flex flex-wrap gap-1.5">
        {present.map(([label, ids]) =>
          ids!.map((id) => (
            <Badge key={`${label}-${id}`}>
              {label}: {id}
            </Badge>
          ))
        )}
      </div>
    </section>
  );
}
