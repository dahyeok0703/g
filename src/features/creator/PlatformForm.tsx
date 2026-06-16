import { useMemo, useState } from 'react';
import { Check, Plus, Trash2 } from 'lucide-react';
import { Field, NumberInput, Select, TextInput } from '@/components/ui/Field';
import { Badge } from '@/components/ui/Badge';
import { WEAPONS } from '@/data';
import { platformCombatValue } from '@/lib/combatValue';
import { customId } from '@/lib/id';
import {
  AIR_TYPE_LABEL,
  GROUND_TYPE_LABEL,
  NAVAL_TYPE_LABEL,
} from '@/lib/labels';
import { useCustomStore } from '@/store/useCustomStore';
import type {
  ArmamentMount,
  Domain,
  Platform,
  WeaponSystem,
} from '@/types';

const TYPE_OPTIONS: Record<Domain, Record<string, string>> = {
  naval: NAVAL_TYPE_LABEL,
  air: AIR_TYPE_LABEL,
  ground: GROUND_TYPE_LABEL,
};

export function PlatformForm() {
  const addPlatform = useCustomStore((s) => s.addPlatform);
  const customWeapons = useCustomStore((s) => s.weapons);
  const [saved, setSaved] = useState<string | null>(null);

  const [domain, setDomain] = useState<Domain>('naval');
  const [type, setType] = useState<string>('destroyer');
  const [name, setName] = useState('');
  const [nameKo, setNameKo] = useState('');
  const [origin, setOrigin] = useState('XX');
  const [specs, setSpecs] = useState<Record<string, number | ''>>({});
  const [mounts, setMounts] = useState<ArmamentMount[]>([]);

  const weaponOptions = useMemo(
    () => [...WEAPONS, ...customWeapons],
    [customWeapons]
  );
  const weaponMap = useMemo(
    () => new Map<string, WeaponSystem>(weaponOptions.map((w) => [w.id, w])),
    [weaponOptions]
  );

  const setSpec = (k: string, v: string) => setSpecs((p) => ({ ...p, [k]: v === '' ? '' : Number(v) }));
  const spec = (k: string): number | undefined => (specs[k] === '' || specs[k] == null ? undefined : Number(specs[k]));

  const draft = useMemo<Platform>(() => {
    const base = {
      id: 'preview',
      name: name || '(이름 없음)',
      nameKo: nameKo || undefined,
      origin,
      armament: mounts,
      isCustom: true,
    };
    if (domain === 'naval') {
      return { ...base, domain, type: type as never, displacement_t: spec('displacement_t') ?? 0, speed_kn: spec('speed_kn'), crew: spec('crew') } as Platform;
    }
    if (domain === 'air') {
      return { ...base, domain, type: type as never, maxSpeed_mach: spec('maxSpeed_mach'), combatRadius_km: spec('combatRadius_km'), hardpoints: spec('hardpoints') } as Platform;
    }
    return { ...base, domain, type: type as never, weight_t: spec('weight_t'), engine_hp: spec('engine_hp'), speed_kmh: spec('speed_kmh') } as Platform;
  }, [domain, type, name, nameKo, origin, specs, mounts]);

  const cv = platformCombatValue(draft, (id) => weaponMap.get(id));
  const canSave = name.trim().length > 0;

  const addMount = () =>
    setMounts((m) => [...m, { weaponSystemId: weaponOptions[0]?.id ?? '', mountType: 'hardpoint', quantity: 1 }]);
  const updateMount = (i: number, patch: Partial<ArmamentMount>) =>
    setMounts((m) => m.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  const removeMount = (i: number) => setMounts((m) => m.filter((_, j) => j !== i));

  const save = () => {
    if (!canSave) return;
    const id = customId('p', name);
    addPlatform({ ...draft, id, combatValue: undefined } as Platform);
    setSaved(id);
    setName('');
    setNameKo('');
    setSpecs({});
    setMounts([]);
    setTimeout(() => setSaved(null), 2500);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="도메인">
            <Select
              value={domain}
              onChange={(e) => {
                const d = e.target.value as Domain;
                setDomain(d);
                setType(Object.keys(TYPE_OPTIONS[d])[0]);
              }}
            >
              <option value="naval">해군</option>
              <option value="air">공군</option>
              <option value="ground">지상</option>
            </Select>
          </Field>
          <Field label="기종 분류">
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              {Object.entries(TYPE_OPTIONS[domain]).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </Select>
          </Field>
          <Field label="명칭 (영문)"><TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="My-Destroyer" /></Field>
          <Field label="명칭 (한글)"><TextInput value={nameKo} onChange={(e) => setNameKo(e.target.value)} placeholder="내 구축함" /></Field>
          <Field label="원산국 (ISO)"><TextInput value={origin} onChange={(e) => setOrigin(e.target.value.toUpperCase().slice(0, 2))} /></Field>
        </div>

        {/* domain-specific specs */}
        <div className="grid grid-cols-2 gap-3 border-t border-hud-line pt-4 sm:grid-cols-3">
          {domain === 'naval' && (
            <>
              <Field label="배수량 (t)"><NumberInput value={specs.displacement_t ?? ''} onChange={(e) => setSpec('displacement_t', e.target.value)} /></Field>
              <Field label="속력 (kn)"><NumberInput value={specs.speed_kn ?? ''} onChange={(e) => setSpec('speed_kn', e.target.value)} /></Field>
              <Field label="승조원"><NumberInput value={specs.crew ?? ''} onChange={(e) => setSpec('crew', e.target.value)} /></Field>
            </>
          )}
          {domain === 'air' && (
            <>
              <Field label="최대속도 (Mach)"><NumberInput value={specs.maxSpeed_mach ?? ''} onChange={(e) => setSpec('maxSpeed_mach', e.target.value)} /></Field>
              <Field label="전투반경 (km)"><NumberInput value={specs.combatRadius_km ?? ''} onChange={(e) => setSpec('combatRadius_km', e.target.value)} /></Field>
              <Field label="하드포인트"><NumberInput value={specs.hardpoints ?? ''} onChange={(e) => setSpec('hardpoints', e.target.value)} /></Field>
            </>
          )}
          {domain === 'ground' && (
            <>
              <Field label="전투중량 (t)"><NumberInput value={specs.weight_t ?? ''} onChange={(e) => setSpec('weight_t', e.target.value)} /></Field>
              <Field label="엔진출력 (hp)"><NumberInput value={specs.engine_hp ?? ''} onChange={(e) => setSpec('engine_hp', e.target.value)} /></Field>
              <Field label="속도 (km/h)"><NumberInput value={specs.speed_kmh ?? ''} onChange={(e) => setSpec('speed_kmh', e.target.value)} /></Field>
            </>
          )}
        </div>

        {/* armament builder */}
        <div className="border-t border-hud-line pt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="hud-label">탑재 무장 (슬롯)</span>
            <button onClick={addMount} className="flex items-center gap-1 font-mono text-xs text-hud-accent hover:underline">
              <Plus size={13} /> 슬롯 추가
            </button>
          </div>
          {mounts.length === 0 && (
            <p className="rounded-md border border-dashed border-hud-line px-3 py-4 text-center text-xs text-hud-ink-soft">
              무장 슬롯을 추가하세요. 기존/커스텀 무기를 장착할 수 있습니다.
            </p>
          )}
          <div className="space-y-2">
            {mounts.map((mount, i) => (
              <div key={i} className="flex items-center gap-2 rounded-md border border-hud-line bg-hud-panel-2/40 p-2">
                <Select
                  value={mount.weaponSystemId}
                  onChange={(e) => updateMount(i, { weaponSystemId: e.target.value })}
                  className="flex-1"
                >
                  {weaponOptions.map((w) => (
                    <option key={w.id} value={w.id}>{w.nameKo ?? w.name}</option>
                  ))}
                </Select>
                <Select value={mount.mountType} onChange={(e) => updateMount(i, { mountType: e.target.value })} className="w-32">
                  {['VLS', 'deck-launcher', 'gun', 'hardpoint', 'torpedo-tube', 'ciws'].map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </Select>
                <NumberInput
                  value={mount.quantity}
                  onChange={(e) => updateMount(i, { quantity: Number(e.target.value) || 0 })}
                  className="w-20"
                />
                <button onClick={() => removeMount(i)} className="shrink-0 p-1 text-hud-ink-soft hover:text-hud-danger">
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* preview / save */}
      <aside className="space-y-3">
        <div className="hud-panel p-4">
          <div className="hud-label mb-2">미리보기</div>
          <div className="mb-1 text-[15px] font-medium text-hud-ink">{draft.nameKo || draft.name}</div>
          <div className="mb-3 flex flex-wrap gap-1.5">
            <Badge tone="info">{TYPE_OPTIONS[domain][type]}</Badge>
            <Badge>{mounts.length} 슬롯</Badge>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="hud-label">전투가치 (CV)</span>
            <span className="stat-value text-2xl font-bold text-hud-accent">{cv}</span>
          </div>
        </div>
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
