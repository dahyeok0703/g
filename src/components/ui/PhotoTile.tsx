import { useState } from 'react';
import type { ResolvedItem } from '@/lib/types';
import { Icon } from './Icon';

// 3:4 photo tile with blur-up load + graceful SVG fallback (spec §3-A, §4).
// `iconKey` is the dataset's fallback glyph for the item's slot.

export function PhotoTile({
  item,
  iconKey,
  loading = false,
}: {
  item?: ResolvedItem;
  iconKey: string;
  loading?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const image = item?.image;
  const showPhoto = Boolean(image?.url) && !failed;

  return (
    <figure className="group relative aspect-[3/4] overflow-hidden rounded-photo border border-line bg-surface">
      {/* skeleton while the curation/image is still resolving */}
      {loading && !showPhoto && <div className="skeleton absolute inset-0" />}

      {showPhoto ? (
        <img
          src={image!.url}
          alt={item?.name ?? ''}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover blur-up ${loaded ? 'is-loaded' : ''} transition-transform duration-500 group-hover:scale-[1.03]`}
        />
      ) : (
        !loading && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-ink-soft/60">
            <Icon name={iconKey} size={40} />
          </div>
        )
      )}

      {/* item name + source caption */}
      {item?.name && (
        <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/45 to-transparent p-3">
          <span className="text-[13px] font-medium text-white drop-shadow-sm">
            {item.name}
          </span>
          {image?.link && (
            <a
              href={image.link}
              target="_blank"
              rel="noreferrer noopener"
              onClick={(e) => e.stopPropagation()}
              className="shrink-0 text-[10px] text-white/70 underline-offset-2 hover:underline"
            >
              {image.source}
            </a>
          )}
        </figcaption>
      )}
    </figure>
  );
}
