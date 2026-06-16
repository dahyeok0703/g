import { useNavigate } from 'react-router-dom';
import { Modal } from '@/components/ui/Modal';
import { Badge, ConfidenceBadge } from '@/components/ui/Badge';
import { getWeapon, platformsUsingWeapon } from '@/data';
import { valueOfWeapon } from '@/data';
import { CATEGORY_LABEL, DOMAIN_TYPE_LABEL, ROLE_LABEL } from '@/lib/labels';
import { intl } from '@/lib/format';
import type { WeaponSystem } from '@/types';

// Weapon drilldown + reverse lookup (spec §4.2, Stage 7): which platforms mount
// this weapon.
export function WeaponDetail({
  weaponId,
  extraWeapons,
  onClose,
}: {
  weaponId: string | null;
  extraWeapons?: Map<string, WeaponSystem>;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const w = weaponId ? getWeapon(weaponId, extraWeapons) : undefined;
  const users = weaponId ? platformsUsingWeapon(weaponId) : [];

  const specs: [string, string][] = [];
  if (w) {
    if (w.range_km != null) specs.push(['사거리', `${intl(w.range_km)} km`]);
    if (w.speed_mach != null) specs.push(['속도', `Mach ${w.speed_mach}`]);
    if (w.warhead_kg != null) specs.push(['탄두중량', `${intl(w.warhead_kg)} kg`]);
    if (w.penetration_mm != null) specs.push(['관통력', `${w.penetration_mm} mm`]);
    if (w.caliber_mm != null) specs.push(['구경', `${w.caliber_mm} mm`]);
    if (w.rof_rpm != null) specs.push(['발사속도', `${w.rof_rpm} rpm`]);
    if (w.introduced != null) specs.push(['도입', `${w.introduced}년`]);
    specs.push(['원산국', w.origin]);
    specs.push(['전투가치(CV)', String(valueOfWeapon(w.id, extraWeapons))]);
  }

  return (
    <Modal
      open={Boolean(weaponId)}
      onClose={onClose}
      title={
        w && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-base font-bold text-hud-ink">{w.nameKo ?? w.name}</span>
            <Badge tone="info">{CATEGORY_LABEL[w.category]}</Badge>
            {w.role && <Badge>{ROLE_LABEL[w.role] ?? w.role}</Badge>}
            {w.isCustom && <Badge tone="accent">커스텀</Badge>}
            <ConfidenceBadge level={w.dataConfidence} />
          </div>
        )
      }
    >
      {!w ? (
        <p className="text-sm text-hud-ink-soft">무기 정보를 찾을 수 없습니다: {weaponId}</p>
      ) : (
        <div className="space-y-5">
          <p className="font-mono text-xs text-hud-ink-soft">{w.name}</p>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {specs.map(([label, value]) => (
              <div key={label} className="rounded-lg border border-hud-line bg-hud-panel-2/40 px-3 py-2">
                <div className="hud-label mb-0.5">{label}</div>
                <div className="stat-value text-sm text-hud-ink">{value}</div>
              </div>
            ))}
          </div>

          {w.guidance && w.guidance.length > 0 && (
            <section>
              <h3 className="hud-label mb-2 text-hud-accent">유도 방식</h3>
              <div className="flex flex-wrap gap-1.5">
                {w.guidance.map((g) => (
                  <Badge key={g}>{g}</Badge>
                ))}
              </div>
            </section>
          )}

          {w.notes && <p className="text-xs text-hud-ink-soft">※ {w.notes}</p>}

          <section>
            <h3 className="hud-label mb-2 text-hud-accent">
              이 무기를 장착한 플랫폼 ({users.length})
            </h3>
            {users.length === 0 ? (
              <p className="text-sm text-hud-ink-soft">시드 카탈로그 내 장착 플랫폼이 없습니다.</p>
            ) : (
              <ul className="flex flex-wrap gap-1.5">
                {users.map((p) => (
                  <li key={p.id}>
                    <Badge tone="neutral">
                      {p.nameKo ?? p.name}
                      <span className="text-hud-ink-soft"> · {DOMAIN_TYPE_LABEL[p.type] ?? p.type}</span>
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <button
            onClick={() => {
              onClose();
              navigate(`/catalog?weapon=${w.id}`);
            }}
            className="font-mono text-xs text-hud-ink-soft underline-offset-2 hover:text-hud-accent hover:underline"
          >
            카탈로그에서 보기 →
          </button>
        </div>
      )}
    </Modal>
  );
}
