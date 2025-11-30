export function getAdvancedPagination(current: number, total: number, delta = 2) {
    if (total <= 1) return [0]

    const range: (number | string)[] = [];
    const left = Math.max(0, current - delta);
    const right = Math.min(total - 1, current + delta);

    // Always include first page
    if (left > 0) {
        range.push(0);
    }

    // Insert ellipsis before middle section
    if (left > 1) {
        range.push("...");
    }

    // Middle pages
    for (let i = left; i <= right; i++) {
        range.push(i);
    }

    // Insert ellipsis after middle section
    if (right < total - 2) {
        range.push("...");
    }

    // Always include last page
    if (right < total - 1) {
        range.push(total - 1);
    }

    return range;
}
