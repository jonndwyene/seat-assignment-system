// ─── Types ────────────────────────────────────────────────────────────────────

interface Student {
  firstname: string;
  middleInitial: string;
  lastname: string;
  visionIssues: boolean;
  hearingImpairment: boolean;
  medicalNeeds: boolean;
  physicalNeeds: boolean;
  learningNeeds: boolean;
}

interface Element {
  x: number;
  y: number;
}

interface SeatAssignment {
  x: number;
  y: number;
  lastname: string | null; // null = empty/unoccupied seat
}

// ─── Priority Weights ─────────────────────────────────────────────────────────

const PRIORITY_WEIGHTS: Record<
  keyof Omit<Student, "firstname" | "middleInitial" | "lastname">,
  number
> = {
  physicalNeeds:     4,
  visionIssues:      2,
  hearingImpairment: 2,
  medicalNeeds:      4,
  learningNeeds:     4,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function computePriorityScore(student: Student): number {
  return (
    (student.physicalNeeds     ? PRIORITY_WEIGHTS.physicalNeeds     : 0) +
    (student.visionIssues      ? PRIORITY_WEIGHTS.visionIssues      : 0) +
    (student.hearingImpairment ? PRIORITY_WEIGHTS.hearingImpairment : 0) +
    (student.medicalNeeds      ? PRIORITY_WEIGHTS.medicalNeeds      : 0) +
    (student.learningNeeds     ? PRIORITY_WEIGHTS.learningNeeds     : 0)
  );
}

/**
 * Lower rank = more desirable seat (closer to top-left).
 * Row (y) dominates so front rows fill before column order is considered.
 */
function seatDesirabilityRank(seat: Element): number {
  return seat.y * 1_000_000 + seat.x;
}

// ─── Hungarian Algorithm (min-cost, O(n³)) ────────────────────────────────────

function hungarianAlgorithm(costMatrix: number[][]): number[] {
  const n = costMatrix.length;
  const C = costMatrix.map(row => [...row]);

  const u:   number[] = new Array(n + 1).fill(0);
  const v:   number[] = new Array(n + 1).fill(0);
  const p:   number[] = new Array(n + 1).fill(0);
  const way: number[] = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    p[0] = i;
    let j0 = 0;
    const minDist: number[] = new Array(n + 1).fill(Infinity);
    const used: boolean[]   = new Array(n + 1).fill(false);

    do {
      used[j0] = true;
      const i0 = p[j0];
      let delta = Infinity;
      let j1 = -1;

      for (let j = 1; j <= n; j++) {
        if (!used[j]) {
          const cur = C[i0 - 1][j - 1] - u[i0] - v[j];
          if (cur < minDist[j]) { minDist[j] = cur; way[j] = j0; }
          if (minDist[j] < delta) { delta = minDist[j]; j1 = j; }
        }
      }

      for (let j = 0; j <= n; j++) {
        if (used[j]) { u[p[j]] += delta; v[j] -= delta; }
        else          { minDist[j] -= delta; }
      }

      j0 = j1!;
    } while (p[j0] !== 0);

    do { p[j0] = p[way[j0]]; j0 = way[j0]; } while (j0);
  }

  const assignment: number[] = new Array(n).fill(-1);
  for (let j = 1; j <= n; j++) {
    if (p[j] !== 0) assignment[p[j] - 1] = j - 1;
  }
  return assignment;
}

// ─── Main Function ────────────────────────────────────────────────────────────

export function generateOptimalSeatAssignment(
  students: Student[],
  elements: Element[]
): SeatAssignment[] {
  // Start with every seat empty
  const result: SeatAssignment[] = elements.map(e => ({ x: e.x, y: e.y, lastname: null }));

  if (students.length === 0 || elements.length === 0) return result;

  // ── 1. Sort students by priority score descending ──────────────────────────
  const scoredStudents = students
    .map(student => ({ student, score: computePriorityScore(student) }))
    .sort((a, b) => b.score - a.score);

  // ── 2. Partition seats into front-row vs the rest ─────────────────────────
  const minY = Math.min(...elements.map(e => e.y));

  const frontSeats = elements
    .filter(e => e.y === minY)
    .sort((a, b) => a.x - b.x);          // left → right within front row

  const backSeats = elements
    .filter(e => e.y !== minY)
    .sort((a, b) => seatDesirabilityRank(a) - seatDesirabilityRank(b));

  // ── 3. Split students: front-row candidates vs the rest ───────────────────
  //
  //  Rule: fill the entire front row first.
  //  • If students <= frontSeats: all students go to the front.
  //  • Otherwise:  first frontSeats.length students fill the front,
  //                remainder fill back seats via Hungarian.
  const frontCount   = Math.min(scoredStudents.length, frontSeats.length);
  const frontStudents = scoredStudents.slice(0, frontCount);
  const backStudents  = scoredStudents.slice(frontCount);

  // ── 4. Assign front-row students via Hungarian on just the front seats ─────
  if (frontStudents.length > 0) {
    const nf = frontStudents.length; // ≤ frontSeats.length
    const costF: number[][] = Array.from({ length: nf }, () => new Array(nf).fill(0));

    for (let i = 0; i < nf; i++) {
      for (let j = 0; j < nf; j++) {
        // Among front seats use only left-right rank (all same y)
        costF[i][j] = i + j;
      }
    }

    const assignF = hungarianAlgorithm(costF);
    for (let i = 0; i < nf; i++) {
      const seat = frontSeats[assignF[i]];
      const idx  = result.findIndex(r => r.x === seat.x && r.y === seat.y);
      result[idx].lastname = frontStudents[i].student.lastname;
    }
  }

  // ── 5. Assign remaining students to back seats via Hungarian ───────────────
  if (backStudents.length > 0 && backSeats.length > 0) {
    const nb = Math.max(backStudents.length, backSeats.length);
    const MAX = nb * 2 + 10;

    const costB: number[][] = Array.from({ length: nb }, () => new Array(nb).fill(0));

    for (let i = 0; i < nb; i++) {
      for (let j = 0; j < nb; j++) {
        const sRank = i < backStudents.length ? i : MAX;
        const cRank = j < backSeats.length    ? j : MAX;
        costB[i][j] = sRank + cRank;
      }
    }

    const assignB = hungarianAlgorithm(costB);
    for (let i = 0; i < backStudents.length; i++) {
      const seatIdx = assignB[i];
      if (seatIdx < backSeats.length) {
        const seat = backSeats[seatIdx];
        const idx  = result.findIndex(r => r.x === seat.x && r.y === seat.y);
        result[idx].lastname = backStudents[i].student.lastname;
      }
    }
  }

  return result;
}