export function pluralize(count: number, one: string, few: string, many: string): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return `${count} ${one}`;
  } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return `${count} ${few}`;
  } else {
    return `${count} ${many}`;
  }
}

// Helper для материалов
export function pluralizeMaterials(count: number): string {
  return pluralize(count, 'материал', 'материала', 'материалов');
}

// Helper для просмотров
export function pluralizeViews(count: number): string {
  return pluralize(count, 'просмотр', 'просмотра', 'просмотров');
}

// Helper для лайков
export function pluralizeLikes(count: number): string {
  return pluralize(count, 'лайк', 'лайка', 'лайков');
}
