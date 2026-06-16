import { Badge } from '@/components/ui/Badge';
import { getWeapon } from '@/data';
import { CATEGORY_LABEL, ROLE_LABEL } from '@/lib/labels';
import type { ArmamentMount, Platform, WeaponSystem } from '@/types';

const MOUNT_LABEL: Record<string, string> = {
  VLS: '수직발사기',
  'deck-launcher': '갑판 발사대',
  gun: '함포/주포',
  hardpoint: '하드포인트',
  'torpedo-tube': '어뢰발사관',
  ciws: '근접방어',
  sensor: '센서',
};

// Fully expands a platform's armament (spec §4.1 / §7) — every mount with its
// weapon, quantity, and mixed-loadout breakdown. Weapon rows are clickable.
export function ArmamentView({
  platform,
  extraWeapons,
  onWeapon,
}: {
  platform: Platform;
  extraWeapons?: Map<string, WeaponSystem>;
  onWeapon?: (id: string) => void;
}) {
  if (platform.armament.length === 0) {
    return <p className="text-sm text-hud-ink-soft">탑재 무장 정보가 없습니다.</p>;
  }
  return (
    <ul className="space-y-2">
      {platform.armament.map((mount, i) => (
        <MountRow key={i} mount={mount} extraWeapons={extraWeapons} onWeapon={onWeapon} />
      ))}
    </ul>
  );
}

function MountRow({
  mount,
  extraWeapons,
  onWeapon,
}: {
  mount: ArmamentMount;
  extraWeapons?: Map<string, WeaponSystem>;
  onWeapon?: (id: string) => void;
}) {
  const primary = getWeapon(mount.weaponSystemId, extraWeapons);
  const hasLoadout = mount.loadout && mount.loadout.length > 0;

  return (
    <li className="rounded-lg border border-hud-line bg-hud-panel-2/50 px-3.5 py-3">
      <div className="flex flex-wrap items-center gap-2">
        {mount.mountType && (
          <Badge tone="info">{MOUNT_LABEL[mount.mountType] ?? mount.mountType}</Badge>
        )}
        <WeaponChip
          weapon={primary}
          fallback={mount.weaponSystemId}
          onClick={onWeapon}
        />
        <span className="stat-value ml-auto text-sm font-semibold text-hud-accent">
          ×{mount.quantity.toLocaleString()}
          {mount.mountType === 'VLS' ? ' 셀' : ''}
        </span>
      </div>

      {/* mixed loadout breakdown (e.g. VLS 96 cells) */}
      {hasLoadout && (
        <div className="mt-2 flex flex-wrap gap-1.5 border-t border-hud-line pt-2">
          {mount.loadout!.map((l, j) => {
            const w = getWeapon(l.weaponSystemId, extraWeapons);
            return (
              <button
                key={j}
                onClick={() => onWeapon?.(l.weaponSystemId)}
                disabled={!onWeapon || !w}
                className="flex items-center gap-1.5 rounded border border-hud-line px-2 py-1 font-mono text-[11px] text-hud-ink-soft transition-colors enabled:hover:border-hud-accent-dim enabled:hover:text-hud-ink"
              >
                <span className="text-hud-ink">{w?.nameKo ?? w?.name ?? l.weaponSystemId}</span>
                <span className="text-hud-accent">×{l.count}</span>
              </button>
            );
          })}
        </div>
      )}

      {mount.notes && (
        <p className="mt-2 text-xs text-hud-ink-soft">※ {mount.notes}</p>
      )}
    </li>
  );
}

function WeaponChip({
  weapon,
  fallback,
  onClick,
}: {
  weapon?: WeaponSystem;
  fallback: string;
  onClick?: (id: string) => void;
}) {
  const label = weapon?.nameKo ?? weapon?.name ?? fallback;
  const meta = weapon
    ? [CATEGORY_LABEL[weapon.category], weapon.role && ROLE_LABEL[weapon.role]]
        .filter(Boolean)
        .join(' · ')
    : '';
  return (
    <button
      onClick={() => weapon && onClick?.(weapon.id)}
      disabled={!onClick || !weapon}
      className="group min-w-0 text-left enabled:hover:text-hud-accent"
    >
      <span className="block truncate text-[15px] font-medium text-hud-ink group-enabled:group-hover:text-hud-accent">
        {label}
      </span>
      {meta && <span className="block truncate text-[11px] text-hud-ink-soft">{meta}</span>}
    </button>
  );
}
