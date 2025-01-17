export interface PortfolioItem {
  id: string;
  slug: string;
  code: string;
  title: string;
  image: string;
  year: number;
  category: string;
  tags: string[];
  location: string;
  size: string;
}

export interface CarouselImage {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

// Generate more realistic mock data
export const portfolioItems: PortfolioItem[] = Array.from({ length: 100 }, (_, i) => ({
  id: (i + 1).toString(),
  slug: `SIP-${(1000 + i).toString()}`,
  code: `SIP-${(1000 + i).toString()}`,
  title: [
    '대전 한밭수목원',
    '중흥S클래스 세종1-5생활권',
    '포스코 판교 더 샵 퍼스트파크',
    '포스코 하남 감일 C2BL',
    '창원 중동 대영 유니시티 1차',
    '고양 항동 계룡 리슈빌',
    '진주혁신도시 A-12BL',
    '진주혁신도시 공공주택',
  ][i % 8],
  image: `/placeholder.svg?height=600&width=800&text=Project+${i + 1}`,
  year: 2010 + Math.floor(i / 10),
  category: ['주거', '공공시설', '오피스', '리조트'][i % 4],
  tags: ['도시재생', '친환경', '스마트시티', '복합단지'].slice(0, Math.floor(Math.random() * 4) + 1),
  location: '서울특별시',
  size: `${Math.floor(Math.random() * 50000 + 10000)}㎡`,
}));

export const portfolioCarouselImages: CarouselImage[] = [
  {
    id: 1,
    title: '서울숲 복합문화공원',
    description: '도시 재생을 통한 새로운 문화 공간 창출',
    image: '/images/banner-acrotower.jpg',
    category: '공공시설'
  },
  {
    id: 2,
    title: '판교 더샵 퍼스트파크',
    description: '자연과 기술이 공존하는 주거 공간',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070',
    category: '주거'
  },
  {
    id: 3,
    title: '해운대 마린시티',
    description: '해안 도시의 새로운 랜드마크',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071',
    category: '복합단지'
  }
]; 