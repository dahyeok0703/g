import { Field, Select } from '@/components/ui/Field';
import type { ScenarioVars } from '@/sim';

// Scenario variable controls incl. tunable coefficients as sliders (spec §4.6).
export function ScenarioControls({
  scenario,
  onChange,
}: {
  scenario: ScenarioVars;
  onChange: (patch: Partial<ScenarioVars>) => void;
}) {
  return (
    <div className="hud-panel p-4">
      <h3 className="hud-label mb-3 text-hud-accent">시나리오 변수</h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
        <Field label="교전 거리">
          <Select value={scenario.engagementRange} onChange={(e) => onChange({ engagementRange: e.target.value as ScenarioVars['engagementRange'] })}>
            <option value="close">근거리</option>
            <option value="medium">중거리</option>
            <option value="long">장거리</option>
          </Select>
        </Field>
        <Field label="홈 어드밴티지">
          <Select value={scenario.homeAdvantage} onChange={(e) => onChange({ homeAdvantage: e.target.value as ScenarioVars['homeAdvantage'] })}>
            <option value="none">없음</option>
            <option value="a">진영 A</option>
            <option value="b">진영 B</option>
          </Select>
        </Field>
        <Field label="핵 처리">
          <Select value={scenario.nuclear ? 'on' : 'off'} onChange={(e) => onChange({ nuclear: e.target.value === 'on' })}>
            <option value="off">재래식만</option>
            <option value="on">핵 억지 반영</option>
          </Select>
        </Field>

        <SliderField label={`기술 우위 (A) ×${scenario.techWeight.toFixed(2)}`} min={0.5} max={2} step={0.05} value={scenario.techWeight} onChange={(v) => onChange({ techWeight: v })} />
        <SliderField label={`사기·보급 ×${scenario.morale.toFixed(2)}`} min={0.5} max={1.5} step={0.05} value={scenario.morale} onChange={(v) => onChange({ morale: v })} />
        <SliderField label={`최대 라운드 ${scenario.maxRounds}`} min={5} max={40} step={1} value={scenario.maxRounds} onChange={(v) => onChange({ maxRounds: v })} />
        <SliderField label={`난수 시드 ${scenario.seed}`} min={1} max={9999} step={1} value={scenario.seed} onChange={(v) => onChange({ seed: v })} />
      </div>
    </div>
  );
}

function SliderField({
  label,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="hud-label mb-1 block">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-hud-accent"
      />
    </label>
  );
}
