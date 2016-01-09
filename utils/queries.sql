-- Unused
select SUM(batting_score), AVG(batting_score) from career where batting_score IS NOT NULL;

select to_char(match_date, 'YYYY') as match_year, round(avg(batting_score),2)
from career
GROUP BY match_year
ORDER BY match_year;


--To be used

--common stats
with stats as (SELECT 
    CASE WHEN batting_score >= 100 then 1 else 0 END century,
    CASE WHEN batting_score >= 50 and batting_score < 100  THEN 1 ELSE 0 END  half_century,
    batting_score
    FROM career
    ) SELECT SUM(century) century, SUM(half_century) half_century, sum(batting_score), round(avg(batting_score),2), max(batting_score) as highest_score
FROM stats

--year on year data
with stats as (SELECT 
    CASE WHEN batting_score >= 100 then 1 else 0 END century,
    CASE WHEN batting_score >= 50 and batting_score < 100  THEN 1 ELSE 0 END  half_century,
    batting_score,
    to_char(match_date, 'YYYY') as match_year
    FROM career
    )SELECT SUM(century) century, SUM(half_century) half_century, sum(batting_score) as total_runs, round(avg(batting_score),2) as batting_average, match_year
FROM stats
group by match_year
order by match_year


--no of wins by sachin and his average
-- SELECT count(*), round(avg(batting_score),2) as average, match_result
-- FROM career
-- group by match_result
select match_result,json_agg(career.batting_score),count(*),round(avg(batting_score),2) as average
from career
group by career.match_result


--Against Australia basic detailed
select match_result,json_agg(career.batting_score),count(*) as total_matches,round(avg(batting_score),2) as batting_average, sum(career.batting_score)
from career
where career.opposition = 'Australia'
group by career.match_result

--Against Australia basic stats
with stats as (SELECT 
    CASE WHEN batting_score >= 100 then 1 else 0 END century,
    CASE WHEN batting_score >= 50 and batting_score < 100  THEN 1 ELSE 0 END  half_century,
    batting_score
    FROM career
    where opposition = 'Australia'
    ) SELECT SUM(century) century, SUM(half_century) half_century, sum(batting_score) as total_runs, round(avg(batting_score),2) as batting_average
FROM stats

--Matches in New Zealand or Australia
with stats as (select round(avg(batting_score),2) as total_average, sum(career.batting_score) as total_runs
        from career
        where ground in(select name from city where country = 'Australia' or country = 'New Zealand'))
select match_result,json_agg(batting_score) as runs_scored,count(*) as total_matches,round(avg(batting_score),2) as batting_average, sum(career.batting_score) as total_runs,total_average, total_runs
from career, stats
where ground in(select name from city where country = 'Australia' or country = 'New Zealand')
group by career.match_result, stats.total_average, stats.total_runs


-- outside India stats
with cities as (select distinct country from city)
select json_agg(career.batting_score) as runs_scored, cities.country, sum(career.batting_score), count(career) as no_of_matches, round(avg(career.batting_score),2) as batting_average
from career, cities
where cities.country =  (select country from city where career.ground = city.name limit 1)
and cities.country != 'India'
group by cities.country


  