import { useMemo, useState } from 'react';
import { AlertTriangle, Check } from 'lucide-react';
import { Field, NumberInput, Select, TextInput } from '@/components/ui/Field';
import { Badge } from '@/components/ui/Badge';
import { weaponCombatValue } from '@/lib/combatValue';
import { customId } from '@/lib/id';
import { validateWeaponFields } from '@/lib/validation';
import { CATEGORY_LABEL, ROLE_LABEL } from '@/lib/labels';
import { useCustomStore } from '@/store/useCustomStore';
import type { MissileRole, WeaponCategory, WeaponSystem } from '@/types';

const CATEGORIES = Object.keys(CATEGORY_LABEL) as WeaponCategory[];
const ROLES = Object.keys(ROLE_LABEL) as MissileRole[];

export function WeaponForm() {
  const addWeapon = useCustomStore((s) => s.addWeapon);
  const [saved, setSaved] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [nameKo, setNameKo] = useState('');
  const [category, setCategory] = useState<WeaponCategory>('missile');
  const [role, setRole] = useState<MissileRole>('anti-ship');
  const [origin, setOrigin] = useState('XX');
  const [introduced, setIntroduced] = useState<number | ''>('');
  const [num, setNum] = useState<Record<string, number | ''>>({});
  const [guidance, setGuidance] = useState('');

  const setN = (k: string, v: string) => setNum((p) => ({ ...p, [k]: v === '' ? '' : Number(v) }));
  const nval = (k: string): number | undefined => (num[k] === '' || num[k] == null ? undefined : Number(num[k]));

  const draft: WeaponSystem = useMemo(
    () => ({
      id: 'preview',
      name: name || '(이름 없음)',
      nameKo: nameKo || undefined,
      category,
      role: category === 'missile' ? role : undefined,
      origin,
      introduced: introduced === '' ? undefined : Number(introduced),
      range_km: nval('range_km'),
      speed_mach: nval('speed_mach'),
      warhead_kg: nval('warhead_kg'),
      penetration_mm: nval('penetration_mm'),
      rof_rpm: nval('rof_rpm'),
      caliber_mm: nval('caliber_mm'),
      guidance: guidance.trim() ? guidance.split(',').map((g) => g.trim()).filter(Boolean) : undefined,
      isCustom: true,
    }),
    [name, nameKo, category, role, origin, introduced, num, guidance]
  );

  const cv = weaponCombatValue(draft);
  const warnings = validateWeaponFields(category, {
    range_km: nval('range_km'),
    speed_mach: nval('speed_mach'),
    warhead_kg: nval('warhead_kg'),
    caliber_mm: nval('caliber_mm'),
    rof_rpm: nval('rof_rpm'),
  });

  const canSave = name.trim().length > 0;

  const save = () => {
    if (!canSave) return;
    const id = customId('w', name);
    addWeapon({ ...draft, id, combatValue: undefined });
    setSaved(id);
    setName('');
    setNameKo('');
    setNum({});
    setGuidance('');
    setTimeout(() => setSaved(null), 2500);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="명칭 (영문)" className="col-span-2 sm:col-span-1">
            <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="예: My-Missile X1" />
          </Field>
          <Field label="명칭 (한글)" className="col-span-2 sm:col-span-1">
            <TextInput value={nameKo} onChange={(e) => setNameKo(e.target.value)} placeholder="예: 내 미사일 X1" />
          </Field>
          <Field label="카테고리">
            <Select value={category} onChange={(e) => setCategory(e.target.value as WeaponCategory)}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{CATEGORY_LABEL[c]}</option>
              ))}
            </Select>
          </Field>
          {category === 'missile' && (
            <Field label="역할">
              <Select value={role} onChange={(e) => setRole(e.target.value as MissileRole)}>
                {ROLES.map((r) => (
                  <option key={r} value={r}>{ROLE_LABEL[r]}</option>
                ))}
              </Select>
            </Field>
          )}
          <Field label="원산국 (ISO)">
            <TextInput value={origin} onChange={(e) => setOrigin(e.target.value.toUpperCase().slice(0, 2))} placeholder="KR" />
          </Field>
          <Field label="도입연도">
            <NumberInput value={introduced} onChange={(e) => setIntroduced(e.target.value === '' ? '' : Number(e.target.value))} placeholder="2025" />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-hud-line pt-4 sm:grid-cols-3">
          <Field label="사거리 (km)"><NumberInput value={num.range_km ?? ''} onChange={(e) => setN('range_km', e.target.value)} /></Field>
          <Field label="속도 (Mach)"><NumberInput value={num.speed_mach ?? ''} onChange={(e) => setN('speed_mach', e.target.value)} /></Field>
          <Field label="탄두중량 (kg)"><NumberInput value={num.warhead_kg ?? ''} onChange={(e) => setN('warhead_kg', e.target.value)} /></Field>
          <Field label="관통력 (mm)"><NumberInput value={num.penetration_mm ?? ''} onChange={(e) => setN('penetration_mm', e.target.value)} /></Field>
          <Field label="발사속도 (rpm)"><NumberInput value={num.rof_rpm ?? ''} onChange={(e) => setN('rof_rpm', e.target.value)} /></Field>
          <Field label="구경 (mm)"><NumberInput value={num.caliber_mm ?? ''} onChange={(e) => setN('caliber_mm', e.target.value)} /></Field>
        </div>

        <Field label="유도 방식 (쉼표로 구분)" hint="예: active-radar, inertial, datalink">
          <TextInput value={guidance} onChange={(e) => setGuidance(e.target.value)} placeholder="active-radar, inertial" />
        </Field>
      </div>

      {/* preview / save */}
      <aside className="space-y-3">
        <div className="hud-panel p-4">
          <div className="hud-label mb-2">미리보기</div>
          <div className="mb-1 text-[15px] font-medium text-hud-ink">{draft.nameKo || draft.name}</div>
          <div className="mb-3 flex flex-wrap gap-1.5">
            <Badge tone="info">{CATEGORY_LABEL[category]}</Badge>
            {category === 'missile' && <Badge>{ROLE_LABEL[role]}</Badge>}
          </div>
          <div className="flex items-baseline justify-between">
            <span className="hud-label">전투가치 (CV)</span>
            <span className="stat-value text-2xl font-bold text-hud-accent">{cv}</span>
          </div>
        </div>

        {warnings.length > 0 && (
          <div className="rounded-lg border border-hud-warn/30 bg-hud-warn/5 p-3">
            {warnings.map((w) => (
              <p key={w.field} className="flex gap-2 text-[11px] text-hud-warn">
                <AlertTriangle size={13} className="mt-0.5 shrink-0" />
                {w.message}
              </p>
            ))}
          </div>
        )}

        <button
          onClick={save}
          disabled={!canSave}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-hud-accent px-4 py-2.5 font-mono text-sm font-semibold text-hud-bg transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          카탈로그에 등록
        </button>
        {saved && (
          <p className="flex items-center justify-center gap-1.5 text-xs text-hud-accent">
            <Check size={13} /> 저장됨: {saved}
          </p>
        )}
      </aside>
    </div>
  );
}
