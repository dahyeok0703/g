import type { ClothingItem, Formality, Slot } from '@/lib/types';

// Curated clothing dataset. Temperature ranges follow the feels-like bands
// in spec §6.1; formality follows §6.2. `tags` drive the condition overlays.
//
// Helper keeps the table terse and readable.
function item(
  id: string,
  slot: Slot,
  name: string,
  minTemp: number,
  maxTemp: number,
  formality: Formality,
  tags: string[],
  icon: string
): ClothingItem {
  return { id, slot, name, minTemp, maxTemp, formality, tags, icon };
}

export const CLOTHING: ClothingItem[] = [
  // ── OUTER ───────────────────────────────────────────────
  item('o-linen-shirt', 'outer', '얇은 린넨 셔츠(걸침)', 21, 28, 2, ['breathable'], 'shirt'),
  item('o-cardigan-thin', 'outer', '얇은 가디건', 17, 23, 2, [], 'cardigan'),
  item('o-shacket', 'outer', '셔켓', 15, 22, 2, [], 'jacket'),
  item('o-blazer', 'outer', '블레이저', 12, 22, 4, ['dressy'], 'blazer'),
  item('o-trench-light', 'outer', '얇은 트렌치코트', 12, 19, 3, ['windbreak'], 'trench'),
  item('o-jacket', 'outer', '코튼 자켓', 12, 18, 2, [], 'jacket'),
  item('o-field', 'outer', '야상 점퍼', 11, 18, 1, ['windbreak'], 'jacket'),
  item('o-leather', 'outer', '가죽 자켓', 10, 17, 2, ['windbreak'], 'jacket'),
  item('o-trench-wool', 'outer', '울 트렌치코트', 7, 14, 3, ['windbreak'], 'trench'),
  item('o-coat-wool', 'outer', '울 코트', 4, 13, 3, [], 'coat'),
  item('o-padding-light', 'outer', '얇은 패딩', 5, 12, 1, ['warm'], 'padding'),
  item('o-mustang', 'outer', '무스탕', 4, 9, 2, ['warm'], 'coat'),
  item('o-padding-long', 'outer', '롱패딩', -10, 5, 1, ['warm'], 'padding'),
  item('o-coat-heavy', 'outer', '두꺼운 더블 코트', -10, 6, 3, ['warm'], 'coat'),
  item('o-windbreaker', 'outer', '바람막이', 10, 20, 0, ['active', 'windbreak', 'rainproof'], 'jacket'),

  // ── TOP ─────────────────────────────────────────────────
  item('t-sleeveless', 'top', '민소매 탑', 27, 40, 1, ['breathable'], 'tee'),
  item('t-tee', 'top', '반팔 티셔츠', 23, 40, 1, ['breathable'], 'tee'),
  item('t-linen-blouse', 'top', '린넨 블라우스', 22, 33, 3, ['breathable', 'dressy'], 'blouse'),
  item('t-shirt-short', 'top', '반팔 셔츠', 22, 32, 3, ['dressy'], 'shirt'),
  item('t-blouse-thin', 'top', '얇은 블라우스', 18, 27, 3, ['dressy'], 'blouse'),
  item('t-long-tee', 'top', '긴팔 티셔츠', 16, 24, 1, [], 'tee'),
  item('t-shirt', 'top', '옥스포드 셔츠', 12, 24, 4, ['dressy'], 'shirt'),
  item('t-knit-thin', 'top', '얇은 니트', 14, 23, 3, [], 'knit'),
  item('t-sweat', 'top', '맨투맨', 12, 21, 1, [], 'sweat'),
  item('t-knit', 'top', '니트 스웨터', 6, 18, 3, ['warm'], 'knit'),
  item('t-knit-heavy', 'top', '두꺼운 울 니트', -10, 12, 3, ['warm'], 'knit'),
  item('t-turtleneck', 'top', '터틀넥', 2, 14, 3, ['warm', 'inner'], 'knit'),
  item('t-heattech', 'top', '히트텍 이너', -10, 10, 0, ['warm', 'inner'], 'tee'),

  // ── BOTTOM ──────────────────────────────────────────────
  item('b-shorts', 'bottom', '반바지', 25, 40, 1, ['breathable'], 'shorts'),
  item('b-linen-pants', 'bottom', '린넨 팬츠', 22, 35, 2, ['breathable'], 'pants'),
  item('b-pleats-skirt', 'bottom', '플리츠 스커트', 20, 33, 3, ['skirt', 'breathable'], 'skirt'),
  item('b-cotton-pants', 'bottom', '면바지', 14, 27, 2, [], 'pants'),
  item('b-slacks', 'bottom', '슬랙스', 6, 26, 4, ['dressy'], 'pants'),
  item('b-skirt', 'bottom', '미디 스커트', 12, 26, 3, ['skirt'], 'skirt'),
  item('b-denim', 'bottom', '데님 팬츠', 4, 24, 1, [], 'pants'),
  item('b-fleece-pants', 'bottom', '기모 팬츠', -10, 12, 1, ['warm'], 'pants'),
  item('b-wide-wool', 'bottom', '울 와이드 팬츠', 2, 16, 3, ['warm', 'dressy'], 'pants'),
  item('b-track', 'bottom', '트랙 팬츠', 8, 26, 0, ['active'], 'pants'),

  // ── SHOES ───────────────────────────────────────────────
  item('s-sandals', 'shoes', '샌들', 24, 40, 1, ['breathable', 'open'], 'sandal'),
  item('s-sneakers', 'shoes', '스니커즈', -5, 30, 1, ['active'], 'sneaker'),
  item('s-loafers', 'shoes', '로퍼', 8, 28, 4, ['dressy'], 'loafer'),
  item('s-derby', 'shoes', '더비 슈즈', 4, 26, 4, ['dressy'], 'loafer'),
  item('s-flats', 'shoes', '플랫 슈즈', 12, 28, 3, [], 'flat'),
  item('s-heels', 'shoes', '힐', 8, 28, 4, ['dressy'], 'heel'),
  item('s-chelsea', 'shoes', '첼시 부츠', 0, 18, 3, [], 'boot'),
  item('s-boots', 'shoes', '앵클 부츠', -5, 14, 3, ['warm'], 'boot'),
  item('s-running', 'shoes', '러닝화', 0, 30, 0, ['active'], 'sneaker'),
  item('s-rainboots', 'shoes', '레인 부츠', 0, 24, 1, ['rainproof'], 'boot'),

  // ── ACCENT ──────────────────────────────────────────────
  item('a-cap', 'accent', '볼캡', 18, 40, 1, ['active', 'uv'], 'cap'),
  item('a-bucket', 'accent', '버킷햇', 20, 40, 1, ['uv'], 'cap'),
  item('a-sunglasses', 'accent', '선글라스', 18, 40, 2, ['uv'], 'glasses'),
  item('a-tote', 'accent', '캔버스 토트백', 8, 32, 2, [], 'bag'),
  item('a-leather-bag', 'accent', '가죽 숄더백', 0, 30, 4, ['dressy'], 'bag'),
  item('a-watch', 'accent', '메탈 시계', -10, 40, 3, ['dressy'], 'watch'),
  item('a-scarf', 'accent', '머플러', -10, 12, 2, ['warm'], 'scarf'),
  item('a-beanie', 'accent', '비니', -10, 10, 1, ['warm'], 'cap'),
  item('a-gloves', 'accent', '장갑', -10, 6, 1, ['warm'], 'gloves'),
  item('a-umbrella', 'accent', '우산', -10, 40, 1, ['rainproof'], 'umbrella'),
  item('a-necklace', 'accent', '레이어드 목걸이', 0, 40, 3, ['dressy'], 'watch'),
];

export const CLOTHING_BY_SLOT: Record<Slot, ClothingItem[]> = CLOTHING.reduce(
  (acc, c) => {
    (acc[c.slot] ??= []).push(c);
    return acc;
  },
  {} as Record<Slot, ClothingItem[]>
);
