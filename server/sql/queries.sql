--graph1
SELECT MatterSponsorName, count(*) as numOfBills
FROM mattersponsors 
INNER JOIN matters
ON mattersponsors.MatterSponsorMatterId = matters.MatterId
WHERE matters.MatterIntroDate >= '2021-01-01'
GROUP BY MatterSponsorName;

--graph2
SELECT MatterBodyName, COUNT(*) as numOfBills
FROM matters
WHERE matters.MatterIntroDate >= '2021-01-01'
GROUP BY MatterBodyName;

--graph 3
SELECT MatterSponsorName, EXTRACT(MONTH FROM matters.MatterIntroDate) as month, COUNT(*) FROM mattersponsors
INNER JOIN matters ON mattersponsors.MatterSponsorMatterId = matters.MatterId
WHERE matters.MatterIntroDate >= '2021-01-01' AND matters.MatterIntroDate <= '2021-12-31'
GROUP BY EXTRACT(MONTH FROM matters.MatterIntroDate), MatterSponsorName
ORDER BY month;
