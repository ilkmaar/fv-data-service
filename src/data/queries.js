// Predefined queries
export const queries = {
    'actionsByPlayer': `
      MATCH (p:Player)-[:DOES_ACTION]-(a:Action)
      WHERE p.name = $playerName
        AND a.time >= $startTime
        AND a.time <= $endTime
      WITH labels(a) AS actionLabels
      UNWIND actionLabels AS actionLabel
      RETURN actionLabel, COUNT(*) AS actionCount
      ORDER BY actionCount DESC
    `
};