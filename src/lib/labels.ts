import type {
  AirType,
  GroundType,
  MissileRole,
  NavalType,
  WeaponCategory,
} from '@/types';

// Korean display labels for enums used across catalog / detail / creator.

export const NAVAL_TYPE_LABEL: Record<NavalType, string> = {
  carrier: '항공모함',
  'helicopter-carrier': '강습상륙/헬기모함',
  cruiser: '순양함',
  destroyer: '구축함',
  frigate: '호위함',
  corvette: '초계함',
  'submarine-ssbn': '전략핵잠수함(SSBN)',
  'submarine-ssn': '공격원잠(SSN)',
  'submarine-ssk': '재래식잠수함(SSK)',
  amphibious: '상륙함',
  patrol: '경비정',
  'mine-warfare': '기뢰전함',
  auxiliary: '지원함',
};

export const AIR_TYPE_LABEL: Record<AirType, string> = {
  fighter: '전투기',
  multirole: '멀티롤 전투기',
  interceptor: '요격기',
  attack: '공격기',
  bomber: '폭격기',
  transport: '수송기',
  tanker: '공중급유기',
  awacs: '조기경보통제기',
  recon: '정찰기',
  'maritime-patrol': '해상초계기',
  'helicopter-attack': '공격헬기',
  'helicopter-utility': '기동헬기',
  'uav-combat': '공격무인기',
  'uav-recon': '정찰무인기',
  trainer: '훈련기',
};

export const GROUND_TYPE_LABEL: Record<GroundType, string> = {
  mbt: '주력전차',
  'light-tank': '경전차',
  ifv: '보병전투차',
  apc: '병력수송장갑차',
  'recon-vehicle': '정찰차량',
  spg: '자주포',
  'towed-artillery': '견인포',
  mlrs: '다연장로켓',
  mortar: '박격포',
  'sam-system': '지대공미사일',
  spaag: '자주대공포',
  'atgm-carrier': '대전차미사일차량',
  'ballistic-launcher': '탄도미사일발사대',
  engineering: '공병장비',
  logistics: '수송/군수',
};

export const DOMAIN_TYPE_LABEL: Record<string, string> = {
  ...NAVAL_TYPE_LABEL,
  ...AIR_TYPE_LABEL,
  ...GROUND_TYPE_LABEL,
};

export const CATEGORY_LABEL: Record<WeaponCategory, string> = {
  missile: '미사일',
  gun: '함포/포',
  torpedo: '어뢰',
  bomb: '폭탄',
  rocket: '로켓',
  radar: '레이더',
  sonar: '소나',
  ew: '전자전',
  ciws: '근접방어(CIWS)',
  countermeasure: '기만체',
};

export const ROLE_LABEL: Record<string, string> = {
  'anti-ship': '대함',
  'anti-air-sam': '함대공/지대공(SAM)',
  'anti-air-aam': '공대공(AAM)',
  'cruise-land-attack': '순항/지상공격',
  ballistic: '탄도미사일',
  'anti-tank': '대전차(ATGM)',
  'anti-radiation': '대레이더',
  'air-to-ground': '공대지',
} satisfies Record<MissileRole, string> & Record<string, string>;

export const DOMAIN_LABEL: Record<string, string> = {
  naval: '해군',
  air: '공군',
  ground: '지상',
};
