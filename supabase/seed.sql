-- Erzeugt von tools/generate-seed.mjs — nicht von Hand aendern.
-- Quelle: celtic.lu (altes CMS), Import 2026-08-24

begin;

insert into public.disciplines (key, name, sort_order, kind) values
  ('50m', '50 m', 50, 'time'),
  ('75m', '75 m', 75, 'time'),
  ('80m', '80 m', 80, 'time'),
  ('60m', '60 m', 60, 'time'),
  ('100m', '100 m', 100, 'time'),
  ('150m', '150 m', 150, 'time'),
  ('200m', '200 m', 200, 'time'),
  ('300m', '300 m', 300, 'time'),
  ('400m', '400 m', 400, 'time'),
  ('500m', '500 m', 500, 'time'),
  ('600m', '600 m', 600, 'time'),
  ('800m', '800 m', 800, 'time'),
  ('1000m', '1000 m', 1000, 'time'),
  ('1500m', '1500 m', 1500, 'time'),
  ('1-mile', '1 Mile', 1610, 'time'),
  ('2000m', '2000 m', 2000, 'time'),
  ('3000m', '3000 m', 3000, 'time'),
  ('5000m', '5000 m', 5000, 'time'),
  ('10000m', '10 000 m', 10000, 'time'),
  ('20000m', '20 000 m', 20000, 'time'),
  ('1-stonn', '1 Stonn', 20500, 'distance'),
  ('50m-h', '50 m H', 20900, 'time'),
  ('60m-h', '60 m H', 21000, 'time'),
  ('80m-h', '80 m H', 21050, 'time'),
  ('100m-h', '100 m H', 21100, 'time'),
  ('110m-h', '110 m H', 21200, 'time'),
  ('300m-h', '300 m H', 21250, 'time'),
  ('400m-h', '400 m H', 21300, 'time'),
  ('2000m-st', '2000 m St.', 22000, 'time'),
  ('3000m-st', '3000 m St.', 22100, 'time'),
  ('10km-marche', '10 km Marche', 23000, 'time'),
  ('10km-strooss', '10 km Strooss', 24000, 'time'),
  ('halbmarathon', 'Halbmarathon', 24100, 'time'),
  ('marathon', 'Marathon', 24200, 'time'),
  ('hauteur', 'Hauteur', 30000, 'distance'),
  ('perche', 'Perche', 30100, 'distance'),
  ('longueur', 'Longueur', 30200, 'distance'),
  ('triple', 'Triple', 30300, 'distance'),
  ('poids', 'Poids', 31000, 'distance'),
  ('poids-4kg', 'Poids 4 kg', 31050, 'distance'),
  ('disque', 'Disque', 31100, 'distance'),
  ('marteau', 'Marteau', 31200, 'distance'),
  ('javelot', 'Javelot', 31300, 'distance'),
  ('pentathlon', 'Pentathlon', 40000, 'points'),
  ('heptathlon', 'Heptathlon', 40100, 'points'),
  ('octathlon', 'Achtkampf', 40150, 'points'),
  ('decathlon', 'Décathlon', 40200, 'points'),
  ('ball', 'Ballwurf', 31350, 'distance'),
  ('4x50m', '4 x 50 m', 49900, 'time'),
  ('4x75m', '4 x 75 m', 49950, 'time'),
  ('3x800m', '3 x 800 m', 50000, 'time'),
  ('3x1000m', '3 x 1000 m', 50100, 'time'),
  ('4x100m', '4 x 100 m', 50200, 'time'),
  ('4x200m', '4 x 200 m', 50300, 'time'),
  ('4x300m', '4 x 300 m', 50350, 'time'),
  ('4x400m', '4 x 400 m', 50400, 'time')
on conflict (key) do nothing;

-- Vereinsrekorde. Die IDs sind deterministisch aus dem Import-Schluessel
-- abgeleitet, damit ein zweiter Lauf keine Dubletten erzeugt.
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-100m-0')::uuid, '100m', 'piste', 'f', '11"94', 11.94, 'U20', 'U20', 2015, '2015', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-100m-0:0')::uuid, md5('f-piste-100m-0')::uuid, 'JONES', 'Laurence', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-150m-1')::uuid, '150m', 'piste', 'f', '19"28', 19.28, '', '', 2001, '2001', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-150m-1:0')::uuid, md5('f-piste-150m-1')::uuid, 'HAYEN', 'Chantal', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-200m-2')::uuid, '200m', 'piste', 'f', '24"58', 24.58, 'U20', 'U20', 2015, '2015', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-200m-2:0')::uuid, md5('f-piste-200m-2')::uuid, 'JONES', 'Laurence', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-300m-3')::uuid, '300m', 'piste', 'f', '40"31', 40.31, 'U20', 'U20', 2015, '2015', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-300m-3:0')::uuid, md5('f-piste-300m-3')::uuid, 'JONES', 'Laurence', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-400m-4')::uuid, '400m', 'piste', 'f', '56"99', 56.99, 'U18', 'U18', 2024, '2024', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-400m-4:0')::uuid, md5('f-piste-400m-4')::uuid, 'CICCONE', 'Julia', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-500m-5')::uuid, '500m', 'piste', 'f', '1''17"89', 77.89, 'Sen', 'Sen', 2015, '2015', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-500m-5:0')::uuid, md5('f-piste-500m-5')::uuid, 'HAYEN', 'Chantal', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-600m-6')::uuid, '600m', 'piste', 'f', '1''36"41', 96.41, 'Sen', 'Sen', 2014, '2014', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-600m-6:0')::uuid, md5('f-piste-600m-6')::uuid, 'HAYEN', 'Chantal', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-800m-7')::uuid, '800m', 'piste', 'f', '2''02"69', 122.69, 'Sen', 'Sen', 2025, '2025', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-800m-7:0')::uuid, md5('f-piste-800m-7')::uuid, 'HOFFMANN', 'Vera', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-1000m-8')::uuid, '1000m', 'piste', 'f', '2''43"87', 163.87, 'U23', 'U23', 2017, '2017', NULL, false, true, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-1000m-8:0')::uuid, md5('f-piste-1000m-8')::uuid, 'HOFFMANN', 'Vera', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-1500m-9')::uuid, '1500m', 'piste', 'f', '4''05"58', 245.58, 'Sen', 'Sen', 2025, '2025', NULL, true, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-1500m-9:0')::uuid, md5('f-piste-1500m-9')::uuid, 'HOFFMANN', 'Vera', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-1-mile-10')::uuid, '1-mile', 'piste', 'f', '4''32"68', 272.68, 'Sen', 'Sen', 2024, '2024', NULL, true, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-1-mile-10:0')::uuid, md5('f-piste-1-mile-10')::uuid, 'HOFFMANN', 'Vera', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-2000m-11')::uuid, '2000m', 'piste', 'f', '6''34"91', 394.91, 'Sen', 'Sen', 2014, '2014', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-2000m-11:0')::uuid, md5('f-piste-2000m-11')::uuid, 'MELLINA', 'Martine', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-3000m-12')::uuid, '3000m', 'piste', 'f', '8''48"84', 528.84, 'Sen', 'Sen', 2025, '2025', NULL, true, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-3000m-12:0')::uuid, md5('f-piste-3000m-12')::uuid, 'HOFFMANN', 'Vera', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-5000m-13')::uuid, '5000m', 'piste', 'f', '15''29"06', 929.06, 'Sen', 'Sen', 2025, '2025', NULL, true, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-5000m-13:0')::uuid, md5('f-piste-5000m-13')::uuid, 'HOFFMANN', 'Vera', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-10000m-14')::uuid, '10000m', 'piste', 'f', '34''04"10', 2044.1, 'Sen', 'Sen', 2015, '2015', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-10000m-14:0')::uuid, md5('f-piste-10000m-14')::uuid, 'Königs-GAMACHU', 'Mimi', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-100m-h-15')::uuid, '100m-h', 'piste', 'f', '13"23', 13.23, 'Sen', 'Sen', 2025, '2025', NULL, true, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-100m-h-15:0')::uuid, md5('f-piste-100m-h-15')::uuid, 'RAUSCH', 'Victoria', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-400m-h-16')::uuid, '400m-h', 'piste', 'f', '58"54', 58.54, 'U20', 'U20', 2026, '2026', NULL, true, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-400m-h-16:0')::uuid, md5('f-piste-400m-h-16')::uuid, 'GRANGER', 'Uyana', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-2000m-st-17')::uuid, '2000m-st', 'piste', 'f', '6''56"64', 416.64, 'U18', 'U18', 2024, '2024', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-2000m-st-17:0')::uuid, md5('f-piste-2000m-st-17')::uuid, 'LOPES', 'Elena', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-3000m-st-18')::uuid, '3000m-st', 'piste', 'f', '10''58"58', 658.58, 'Sen', 'Sen', 2008, '2008', NULL, true, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-3000m-st-18:0')::uuid, md5('f-piste-3000m-st-18')::uuid, 'HANSEN', 'Véronique', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-longueur-19')::uuid, 'longueur', 'piste', 'f', '5,99 m', 5.99, 'U20', 'U20', 2014, '2014', NULL, false, true, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-longueur-19:0')::uuid, md5('f-piste-longueur-19')::uuid, 'JONES', 'Laurence', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-triple-20')::uuid, 'triple', 'piste', 'f', '11,42 m', 11.42, 'U20', 'U20', 2013, '2013', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-triple-20:0')::uuid, md5('f-piste-triple-20')::uuid, 'ZENS', 'Cathie', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-perche-21')::uuid, 'perche', 'piste', 'f', '3,30 m', 3.3, 'U23', 'U23 U20', 2013, '2009 2013', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-perche-21:0')::uuid, md5('f-piste-perche-21')::uuid, 'WEBER', 'Fabienne', 1) on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-perche-21:1')::uuid, md5('f-piste-perche-21')::uuid, 'SCHMIT', 'Cathy', 2) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-hauteur-22')::uuid, 'hauteur', 'piste', 'f', '1,74 m', 1.74, 'U20', 'U20', 2016, '2016', NULL, false, true, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-hauteur-22:0')::uuid, md5('f-piste-hauteur-22')::uuid, 'ZIMMER', 'Cathy', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-disque-23')::uuid, 'disque', 'piste', 'f', '35,39 m', 35.39, 'U20', 'U20', 2015, '2015', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-disque-23:0')::uuid, md5('f-piste-disque-23')::uuid, 'MICHEL', 'Véroniqe', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-poids-24')::uuid, 'poids', 'piste', 'f', '14,06 m', 14.06, 'U20', 'U20', 2007, '2007', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-poids-24:0')::uuid, md5('f-piste-poids-24')::uuid, 'SCHARTZ', 'Kim', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-javelot-25')::uuid, 'javelot', 'piste', 'f', '43,76 m', 43.76, 'U20', 'U20', 2015, '2015', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-javelot-25:0')::uuid, md5('f-piste-javelot-25')::uuid, 'MICHEL', 'Véronique', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-marteau-26')::uuid, 'marteau', 'piste', 'f', '47,90 m', 47.9, 'U23', 'U23', 2008, '2008', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-marteau-26:0')::uuid, md5('f-piste-marteau-26')::uuid, 'SCHARTZ', 'Kim', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-heptathlon-27')::uuid, 'heptathlon', 'piste', 'f', '4 570 P', 4570, 'Sen', 'Sen', 2011, '2011', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-heptathlon-27:0')::uuid, md5('f-piste-heptathlon-27')::uuid, 'HAYEN', 'Chantal', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-4x100m-28')::uuid, '4x100m', 'piste', 'f', '47"18', 47.18, 'U23', 'U23', 2014, '2014', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-4x100m-28:0')::uuid, md5('f-piste-4x100m-28')::uuid, 'RAUSCH', 'Victoria', 1) on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-4x100m-28:1')::uuid, md5('f-piste-4x100m-28')::uuid, 'BAUER', 'Annäis', 2) on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-4x100m-28:2')::uuid, md5('f-piste-4x100m-28')::uuid, 'ZENS', 'Anouk', 3) on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-4x100m-28:3')::uuid, md5('f-piste-4x100m-28')::uuid, 'JONES', 'Laurence', 4) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-4x400m-29')::uuid, '4x400m', 'piste', 'f', '4''00"98', 240.98, 'Sen', 'Sen', 2010, '2010', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-4x400m-29:0')::uuid, md5('f-piste-4x400m-29')::uuid, 'BAUER', 'Anaïs', 1) on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-4x400m-29:1')::uuid, md5('f-piste-4x400m-29')::uuid, 'SCHARTZ', 'Joanne', 2) on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-4x400m-29:2')::uuid, md5('f-piste-4x400m-29')::uuid, 'MELLINA', 'Martine', 3) on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-4x400m-29:3')::uuid, md5('f-piste-4x400m-29')::uuid, 'HAYEN', 'Chantal', 4) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-piste-3x800m-30')::uuid, '3x800m', 'piste', 'f', '6''44"11', 404.11, 'Sen', 'Sen', 2012, '2012', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-3x800m-30:0')::uuid, md5('f-piste-3x800m-30')::uuid, 'LEY-FRANSISSI', 'Tania', 1) on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-3x800m-30:1')::uuid, md5('f-piste-3x800m-30')::uuid, 'GLODEN', 'Jenny', 2) on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-piste-3x800m-30:2')::uuid, md5('f-piste-3x800m-30')::uuid, 'MELLINA', 'Martine', 3) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-100m-0')::uuid, '100m', 'piste', 'm', '10"74', 10.74, 'Sen', 'Sen', 2014, '2014', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-100m-0:0')::uuid, md5('m-piste-100m-0')::uuid, 'GERALDO', 'Festus', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-150m-1')::uuid, '150m', 'piste', 'm', '16"87', 16.87, 'Sen', 'Sen', 1997, '1997', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-150m-1:0')::uuid, md5('m-piste-150m-1')::uuid, 'ZENS', 'Pol', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-200m-2')::uuid, '200m', 'piste', 'm', '21"88', 21.88, 'Sen', 'Sen', 2014, '2014', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-200m-2:0')::uuid, md5('m-piste-200m-2')::uuid, 'GERALDO', 'Festus', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-300m-3')::uuid, '300m', 'piste', 'm', '35"22', 35.22, 'Sen', 'Sen', 1997, '1997', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-300m-3:0')::uuid, md5('m-piste-300m-3')::uuid, 'ZENS', 'Pol', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-400m-4')::uuid, '400m', 'piste', 'm', '48"76', 48.76, 'Sen', 'Sen', 1997, '1997', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-400m-4:0')::uuid, md5('m-piste-400m-4')::uuid, 'ZENS', 'Pol', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-500m-5')::uuid, '500m', 'piste', 'm', '65"40', 65.4, 'Sen', 'Sen', 1997, '1997', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-500m-5:0')::uuid, md5('m-piste-500m-5')::uuid, 'ZENS', 'Pol', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-600m-6')::uuid, '600m', 'piste', 'm', '1''20"50', 80.5, 'Jun', 'Jun', 1977, '1977', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-600m-6:0')::uuid, md5('m-piste-600m-6')::uuid, 'WIETOR', 'Jean-Claude', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-800m-7')::uuid, '800m', 'piste', 'm', '1''49"12', 109.12, 'Esp', 'Esp', 2022, '2022', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-800m-7:0')::uuid, md5('m-piste-800m-7')::uuid, 'QUERINJEAN', 'Ruben', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-1000m-8')::uuid, '1000m', 'piste', 'm', '2''26"28', 146.28, 'Sen', 'Sen', 1991, '1991', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-1000m-8:0')::uuid, md5('m-piste-1000m-8')::uuid, 'ASSEL', 'Claude', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-1500m-9')::uuid, '1500m', 'piste', 'm', '3''39"02', 219.02, 'Esp', 'Esp', 2022, '2022', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-1500m-9:0')::uuid, md5('m-piste-1500m-9')::uuid, 'QUERINJEAN', 'Ruben', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-1-mile-10')::uuid, '1-mile', 'piste', 'm', '4''10"53', 250.53, 'Sen', 'Sen', 2020, '2020', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-1-mile-10:0')::uuid, md5('m-piste-1-mile-10')::uuid, 'BERTEMES', 'Bob', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-2000m-11')::uuid, '2000m', 'piste', 'm', '5''31"70', 331.7, 'Esp', 'Esp', 2010, '2010', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-2000m-11:0')::uuid, md5('m-piste-2000m-11')::uuid, 'MELLINA', 'Pol', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-3000m-12')::uuid, '3000m', 'piste', 'm', '7''53"60', 473.6, 'Esp', 'Esp', 2022, '2022', NULL, true, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-3000m-12:0')::uuid, md5('m-piste-3000m-12')::uuid, 'QUERINJEAN', 'Ruben', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-5000m-13')::uuid, '5000m', 'piste', 'm', '14''04"09', 844.09, 'Sen', 'Sen', 2015, '2015', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-5000m-13:0')::uuid, md5('m-piste-5000m-13')::uuid, 'MELLINA', 'Pol', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-10000m-14')::uuid, '10000m', 'piste', 'm', '29''43"82', 1783.82, 'Sen', 'Sen', 2014, '2014', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-10000m-14:0')::uuid, md5('m-piste-10000m-14')::uuid, 'MELLINA', 'Pol', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-1-stonn-15')::uuid, '1-stonn', 'piste', 'm', '17 400 m', 17400, 'Sen', 'Sen', 1988, '1988', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-1-stonn-15:0')::uuid, md5('m-piste-1-stonn-15')::uuid, 'GUTH', 'Fernand', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-60m-h-16')::uuid, '60m-h', 'piste', 'm', '8"10', 8.1, 'Sen', 'Sen', 1991, '1991', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-60m-h-16:0')::uuid, md5('m-piste-60m-h-16')::uuid, 'Udelhoven', 'Lukas', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-110m-h-17')::uuid, '110m-h', 'piste', 'm', '14"72', 14.72, 'Sen', 'Sen', 2018, '2018', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-110m-h-17:0')::uuid, md5('m-piste-110m-h-17')::uuid, 'GRAILLET', 'François', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-400m-h-18')::uuid, '400m-h', 'piste', 'm', '56"40', 56.4, 'Sen', 'Sen', 1993, '1993', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-400m-h-18:0')::uuid, md5('m-piste-400m-h-18')::uuid, 'Udelhoven', 'Lukas', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-2000m-st-19')::uuid, '2000m-st', 'piste', 'm', '5''41"29', 341.29, 'Sen', 'Sen', 2025, '2025', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-2000m-st-19:0')::uuid, md5('m-piste-2000m-st-19')::uuid, 'WEICHERDING', 'Gil', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-3000m-st-20')::uuid, '3000m-st', 'piste', 'm', '8''41"16', 521.16, 'Esp', 'Esp', 2022, '2022', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-3000m-st-20:0')::uuid, md5('m-piste-3000m-st-20')::uuid, 'QUERINJEAN', 'Ruben', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-hauteur-21')::uuid, 'hauteur', 'piste', 'm', '2,05 m', 2.05, 'Sen', 'Sen', 1989, '1989', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-hauteur-21:0')::uuid, md5('m-piste-hauteur-21')::uuid, 'Udelhoven', 'Lukas', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-longueur-22')::uuid, 'longueur', 'piste', 'm', '7,58 m', 7.58, 'Sen', 'Sen', 2017, '2017', NULL, true, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-longueur-22:0')::uuid, md5('m-piste-longueur-22')::uuid, 'GRAILLET', 'François', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-triple-23')::uuid, 'triple', 'piste', 'm', '13,77 m', 13.77, 'Sen', 'Sen', 1993, '1993', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-triple-23:0')::uuid, md5('m-piste-triple-23')::uuid, 'Udelhoven', 'Lukas', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-perche-24')::uuid, 'perche', 'piste', 'm', '4,30 m', 4.3, 'Sen', 'Sen', 1991, '1991', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-perche-24:0')::uuid, md5('m-piste-perche-24')::uuid, 'BIRCHEN', 'René', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-poids-25')::uuid, 'poids', 'piste', 'm', '12,74 m', 12.74, 'Sen', 'Sen', 1995, '1995', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-poids-25:0')::uuid, md5('m-piste-poids-25')::uuid, 'Udelhoven', 'Lukas', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-javelot-26')::uuid, 'javelot', 'piste', 'm', '63,60 m', 63.6, 'Sen', 'Sen', 1994, '1994', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-javelot-26:0')::uuid, md5('m-piste-javelot-26')::uuid, 'Udelhoven', 'Lukas', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-disque-27')::uuid, 'disque', 'piste', 'm', '38,76 m', 38.76, 'Sen', 'Sen', 1995, '1995', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-disque-27:0')::uuid, md5('m-piste-disque-27')::uuid, 'Udelhoven', 'Lukas', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-marteau-28')::uuid, 'marteau', 'piste', 'm', '35,96 m', 35.96, 'Sen', 'Sen', 2019, '2019', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-marteau-28:0')::uuid, md5('m-piste-marteau-28')::uuid, 'MICHEL', 'Benny', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-decathlon-29')::uuid, 'decathlon', 'piste', 'm', '7 010 P', 7010, 'Sen', 'Sen', 1995, '1995', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-decathlon-29:0')::uuid, md5('m-piste-decathlon-29')::uuid, 'Udelhoven', 'Lukas', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-4x100m-30')::uuid, '4x100m', 'piste', 'm', '44"56', 44.56, 'Sen', 'Sen', 1998, '1998', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-4x100m-30:0')::uuid, md5('m-piste-4x100m-30')::uuid, 'NOWAK', 'Eric', 1) on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-4x100m-30:1')::uuid, md5('m-piste-4x100m-30')::uuid, 'KAYSER', 'Roland', 2) on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-4x100m-30:2')::uuid, md5('m-piste-4x100m-30')::uuid, 'ZENS', 'Pol', 3) on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-4x100m-30:3')::uuid, md5('m-piste-4x100m-30')::uuid, 'SCHEER', 'Sébastien', 4) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-4x400m-31')::uuid, '4x400m', 'piste', 'm', '3''24"86', 204.86, 'Sen', 'Sen', 2023, '2023', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-4x400m-31:0')::uuid, md5('m-piste-4x400m-31')::uuid, 'SCHLAMMES', 'Ben', 1) on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-4x400m-31:1')::uuid, md5('m-piste-4x400m-31')::uuid, 'REILAND', 'Fabrice', 2) on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-4x400m-31:2')::uuid, md5('m-piste-4x400m-31')::uuid, 'HEUTS', 'Sam', 3) on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-4x400m-31:3')::uuid, md5('m-piste-4x400m-31')::uuid, 'RECHT', 'Tom', 4) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-piste-3x1000m-32')::uuid, '3x1000m', 'piste', 'm', '7''38"00', 458, 'Sen', 'Sen', 1983, '1983', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-3x1000m-32:0')::uuid, md5('m-piste-3x1000m-32')::uuid, 'WILLIÈRE', 'Paul', 1) on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-3x1000m-32:1')::uuid, md5('m-piste-3x1000m-32')::uuid, 'SCHMIT', 'Paul', 2) on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-piste-3x1000m-32:2')::uuid, md5('m-piste-3x1000m-32')::uuid, 'PETIT', 'Jean-Claude', 3) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-indoor-50m-0')::uuid, '50m', 'indoor', 'f', '6"51', 6.51, 'Sen', 'Sen', 2025, '2025', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-indoor-50m-0:0')::uuid, md5('f-indoor-50m-0')::uuid, 'RAUSCH', 'Victoria', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-indoor-60m-1')::uuid, '60m', 'indoor', 'f', '7"54', 7.54, 'Sen', 'Sen', 2026, '2026', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-indoor-60m-1:0')::uuid, md5('f-indoor-60m-1')::uuid, 'RAUSCH', 'Victoria', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-indoor-200m-2')::uuid, '200m', 'indoor', 'f', '24"74', 24.74, 'Jun', 'Jun', 2014, '2014', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-indoor-200m-2:0')::uuid, md5('f-indoor-200m-2')::uuid, 'JONES', 'Laurence', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-indoor-300m-3')::uuid, '300m', 'indoor', 'f', '40"70', 40.7, 'Jun', 'Jun', 2015, '2015', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-indoor-300m-3:0')::uuid, md5('f-indoor-300m-3')::uuid, 'ZENS', 'Anouk', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-indoor-400m-4')::uuid, '400m', 'indoor', 'f', '56"54', 56.54, 'Jun', 'Jun', 2016, '2016', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-indoor-400m-4:0')::uuid, md5('f-indoor-400m-4')::uuid, 'ZENS', 'Anouk', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-indoor-600m-5')::uuid, '600m', 'indoor', 'f', '1''34"38', 94.38, 'Cad', 'Cad', 2023, '2023', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-indoor-600m-5:0')::uuid, md5('f-indoor-600m-5')::uuid, 'CICCONE', 'Julia', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-indoor-800m-6')::uuid, '800m', 'indoor', 'f', '2''03"04', 123.04, 'Sen', 'Sen', 2024, '2024', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-indoor-800m-6:0')::uuid, md5('f-indoor-800m-6')::uuid, 'HOFFMANN', 'Vera', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-indoor-1000m-7')::uuid, '1000m', 'indoor', 'f', '2''49"61', 169.61, 'Esp', 'Esp', 2019, '2019', NULL, true, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-indoor-1000m-7:0')::uuid, md5('f-indoor-1000m-7')::uuid, 'HOFFMANN', 'Vera', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-indoor-1500m-8')::uuid, '1500m', 'indoor', 'f', '4''08"73', 248.73, 'Sen', 'Sen', 2023, '2023', NULL, true, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-indoor-1500m-8:0')::uuid, md5('f-indoor-1500m-8')::uuid, 'HOFFMANN', 'Vera', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-indoor-3000m-9')::uuid, '3000m', 'indoor', 'f', '9''07"54', 547.54, 'Sen', 'Sen', 2025, '2025', NULL, true, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-indoor-3000m-9:0')::uuid, md5('f-indoor-3000m-9')::uuid, 'HOFFMANN', 'Vera', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-indoor-5000m-10')::uuid, '5000m', 'indoor', 'f', '15''59"74', 959.74, 'Sen', 'Sen', 2023, '2023', NULL, true, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-indoor-5000m-10:0')::uuid, md5('f-indoor-5000m-10')::uuid, 'HOFFMANN', 'Vera', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-indoor-60m-h-11')::uuid, '60m-h', 'indoor', 'f', '8"08', 8.08, 'Sen', 'Sen', 2026, '2026', NULL, true, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-indoor-60m-h-11:0')::uuid, md5('f-indoor-60m-h-11')::uuid, 'RAUSCH', 'Victoria', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-indoor-longueur-12')::uuid, 'longueur', 'indoor', 'f', '5,95 m', 5.95, 'Jun', 'Jun', 2014, '2014', NULL, true, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-indoor-longueur-12:0')::uuid, md5('f-indoor-longueur-12')::uuid, 'JONES', 'Laurence', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-indoor-hauteur-13')::uuid, 'hauteur', 'indoor', 'f', '1,76 m', 1.76, 'Jun', 'Jun', 2017, '2017', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-indoor-hauteur-13:0')::uuid, md5('f-indoor-hauteur-13')::uuid, 'ZIMMER', 'Cathy', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-indoor-triple-14')::uuid, 'triple', 'indoor', 'f', '10,96 m', 10.96, 'Jun', 'Jun', 2012, '2012', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-indoor-triple-14:0')::uuid, md5('f-indoor-triple-14')::uuid, 'ZENS', 'Cathy', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-indoor-perche-15')::uuid, 'perche', 'indoor', 'f', '3,40 m', 3.4, 'Esp', 'Esp', 2009, '2009', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-indoor-perche-15:0')::uuid, md5('f-indoor-perche-15')::uuid, 'WEBER', 'Fabienne', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-indoor-poids-4kg-16')::uuid, 'poids-4kg', 'indoor', 'f', '13,56 m', 13.56, 'Jun', 'Jun', 2007, '2007', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-indoor-poids-4kg-16:0')::uuid, md5('f-indoor-poids-4kg-16')::uuid, 'SCHARTZ', 'Kim', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-indoor-4x200m-17')::uuid, '4x200m', 'indoor', 'f', '1''43"82', 103.82, 'Cad', 'Cad Sen Jun Esp', 2014, '2014', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-indoor-4x200m-17:0')::uuid, md5('f-indoor-4x200m-17')::uuid, 'ZENS', 'Annouk', 1) on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-indoor-4x200m-17:1')::uuid, md5('f-indoor-4x200m-17')::uuid, 'HAYEN', 'Chantal', 2) on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-indoor-4x200m-17:2')::uuid, md5('f-indoor-4x200m-17')::uuid, 'JONES', 'Laurence', 3) on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-indoor-4x200m-17:3')::uuid, md5('f-indoor-4x200m-17')::uuid, 'BAUER', 'Annaïs', 4) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-indoor-50m-0')::uuid, '50m', 'indoor', 'm', '6"79', 6.79, 'U16', 'U16', 2021, '2021', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-indoor-50m-0:0')::uuid, md5('m-indoor-50m-0')::uuid, 'JÜCH', 'Mats', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-indoor-60m-1')::uuid, '60m', 'indoor', 'm', '7"00', 7, 'Sen', 'Sen', 2013, '2013', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-indoor-60m-1:0')::uuid, md5('m-indoor-60m-1')::uuid, 'GERALDO', 'Festus', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-indoor-100m-2')::uuid, '100m', 'indoor', 'm', '11"80', 11.8, 'Sen', 'Sen', 1991, '1991', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-indoor-100m-2:0')::uuid, md5('m-indoor-100m-2')::uuid, 'WENNMACHER', 'Frank', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-indoor-200m-3')::uuid, '200m', 'indoor', 'm', '22"18', 22.18, 'Sen', 'Sen', 2014, '2014', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-indoor-200m-3:0')::uuid, md5('m-indoor-200m-3')::uuid, 'GERALDO', 'Festus', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-indoor-300m-4')::uuid, '300m', 'indoor', 'm', '35"38', 35.38, 'U23', 'U23', 2011, '2011', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-indoor-300m-4:0')::uuid, md5('m-indoor-300m-4')::uuid, 'FISCHER', 'Sven', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-indoor-400m-5')::uuid, '400m', 'indoor', 'm', '49"63', 49.63, 'U23', 'U23', 2011, '2011', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-indoor-400m-5:0')::uuid, md5('m-indoor-400m-5')::uuid, 'FISCHER', 'Sven', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-indoor-600m-6')::uuid, '600m', 'indoor', 'm', '1''23"19', 83.19, 'U23', 'U23', 2011, '2011', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-indoor-600m-6:0')::uuid, md5('m-indoor-600m-6')::uuid, 'FISCHER', 'Sven', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-indoor-800m-7')::uuid, '800m', 'indoor', 'm', '1''51"37', 111.37, 'U23', 'U23', 2024, '2024', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-indoor-800m-7:0')::uuid, md5('m-indoor-800m-7')::uuid, 'RECHT', 'Tom', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-indoor-1000m-8')::uuid, '1000m', 'indoor', 'm', '2''29"69', 149.69, 'U23', 'U23', 2014, '2014', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-indoor-1000m-8:0')::uuid, md5('m-indoor-1000m-8')::uuid, 'BERTEMES', 'Bob', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-indoor-1500m-9')::uuid, '1500m', 'indoor', 'm', '3''43"89', 223.89, 'Sen', 'Sen', 2021, '2021', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-indoor-1500m-9:0')::uuid, md5('m-indoor-1500m-9')::uuid, 'BERTEMES', 'Bob', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-indoor-2000m-10')::uuid, '2000m', 'indoor', 'm', '5''13"64', 313.64, 'Sen', 'Sen', 2022, '2022', NULL, true, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-indoor-2000m-10:0')::uuid, md5('m-indoor-2000m-10')::uuid, 'BERTEMES', 'Bob', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-indoor-3000m-11')::uuid, '3000m', 'indoor', 'm', '8''10"21', 490.21, 'Sen', 'Sen', 2015, '2015', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-indoor-3000m-11:0')::uuid, md5('m-indoor-3000m-11')::uuid, 'MELLINA', 'Pol', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-indoor-5000m-12')::uuid, '5000m', 'indoor', 'm', '14''27"18', 867.18, 'Sen', 'Sen', 2023, '2023', NULL, true, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-indoor-5000m-12:0')::uuid, md5('m-indoor-5000m-12')::uuid, 'BERTEMES', 'Bob', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-indoor-60m-h-13')::uuid, '60m-h', 'indoor', 'm', '8"14', 8.14, 'Sen', 'Sen', 1991, '1991', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-indoor-60m-h-13:0')::uuid, md5('m-indoor-60m-h-13')::uuid, 'UDELHOVEN', 'Lukas', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-indoor-poids-14')::uuid, 'poids', 'indoor', 'm', '12,77 m', 12.77, 'U23', 'U23', 2022, '2022', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-indoor-poids-14:0')::uuid, md5('m-indoor-poids-14')::uuid, 'MICHEL', 'Benny', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-indoor-hauteur-15')::uuid, 'hauteur', 'indoor', 'm', '1,96 m', 1.96, 'U18', 'U18', 2024, '2024', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-indoor-hauteur-15:0')::uuid, md5('m-indoor-hauteur-15')::uuid, 'JOLY', 'Till', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-indoor-longueur-16')::uuid, 'longueur', 'indoor', 'm', '7,68 m', 7.68, 'Sen', 'Sen', 2017, '2017', NULL, true, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-indoor-longueur-16:0')::uuid, md5('m-indoor-longueur-16')::uuid, 'LAMBERT', 'Romain', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-indoor-perche-17')::uuid, 'perche', 'indoor', 'm', '4,50 m', 4.5, 'U20', 'U20', 2026, '2026', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-indoor-perche-17:0')::uuid, md5('m-indoor-perche-17')::uuid, 'JOLY', 'Till', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-indoor-triple-18')::uuid, 'triple', 'indoor', 'm', '11,15 m', 11.15, 'U20', 'U20', 2011, '2011', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-indoor-triple-18:0')::uuid, md5('m-indoor-triple-18')::uuid, 'MICHEL', 'Roy', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-indoor-heptathlon-19')::uuid, 'heptathlon', 'indoor', 'm', '5 093 P', 5093, 'U18', 'U18', 2025, '2025', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-indoor-heptathlon-19:0')::uuid, md5('m-indoor-heptathlon-19')::uuid, 'JOLY', 'Till', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-indoor-4x200m-20')::uuid, '4x200m', 'indoor', 'm', '1''34"33', 94.33, 'U18', 'U18 U20 U23 U20', 2014, '2014', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-indoor-4x200m-20:0')::uuid, md5('m-indoor-4x200m-20')::uuid, 'RIVNY', 'Genrikh', 1) on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-indoor-4x200m-20:1')::uuid, md5('m-indoor-4x200m-20')::uuid, 'STEFFEN', 'Kevin', 2) on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-indoor-4x200m-20:2')::uuid, md5('m-indoor-4x200m-20')::uuid, 'HERBER', 'Eric', 3) on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-indoor-4x200m-20:3')::uuid, md5('m-indoor-4x200m-20')::uuid, 'KOHL', 'Yannick', 4) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-route-10km-strooss-0')::uuid, '10km-strooss', 'route', 'f', '33''37"', 2017, 'Sen', 'Sen', 2026, '2026', NULL, true, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-route-10km-strooss-0:0')::uuid, md5('f-route-10km-strooss-0')::uuid, 'HOFFMANN', 'Vera', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-route-halbmarathon-1')::uuid, 'halbmarathon', 'route', 'f', '1h18''42"00', 4722, 'Sen', 'Sen', 2015, '2015', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-route-halbmarathon-1:0')::uuid, md5('f-route-halbmarathon-1')::uuid, 'Königs-GAMACHU', 'Mimi', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('f-route-marathon-2')::uuid, 'marathon', 'route', 'f', '2h40''40"00', 9640, 'Sen', 'Sen', 2015, '2015', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('f-route-marathon-2:0')::uuid, md5('f-route-marathon-2')::uuid, 'Königs-Gamachu', 'Mimi', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-route-10km-strooss-0')::uuid, '10km-strooss', 'route', 'm', '29''30"', 1770, 'Sen', 'Sen', 2022, '2022', NULL, true, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-route-10km-strooss-0:0')::uuid, md5('m-route-10km-strooss-0')::uuid, 'KINDE', 'Yonas', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-route-halbmarathon-1')::uuid, 'halbmarathon', 'route', 'm', '1h04''52"00', 3892, 'Sen', 'Sen', 1986, '1986', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-route-halbmarathon-1:0')::uuid, md5('m-route-halbmarathon-1')::uuid, 'PETIT', 'Jean-Claude', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (md5('m-route-marathon-2')::uuid, 'marathon', 'route', 'm', '2h17''09"00', 8229, 'Sen', 'Sen', 2019, '2019', NULL, false, false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('m-route-marathon-2:0')::uuid, md5('m-route-marathon-2')::uuid, 'KINDE', 'Yonas', 1) on conflict (id) do nothing;

-- Stade: Leistungen, die im Stadion aufgestellt wurden. Kein Geschlecht,
-- dafuer eine Nation — deshalb erlaubt das Schema hier gender NULL.
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-100m-0')::uuid, '100m', 'stade', NULL, '11"29', 11.29, '', 2023, 'LUX', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-100m-0:0')::uuid, md5('stade-100m-0')::uuid, 'VAN DER WEKEN', 'Patrizia', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-200m-1')::uuid, '200m', 'stade', NULL, '23"70', 23.7, '', 1998, 'GER', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-200m-1:0')::uuid, md5('stade-200m-1')::uuid, 'GHOSH', 'Shanta', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-400m-2')::uuid, '400m', 'stade', NULL, '53"19', 53.19, '', 1990, 'FRA', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-400m-2:0')::uuid, md5('stade-400m-2')::uuid, 'REGENT-TALBOT', 'Ketty', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-800m-3')::uuid, '800m', 'stade', NULL, '2''04"71', 124.71, '', 2020, 'BEL', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-800m-3:0')::uuid, md5('stade-800m-3')::uuid, 'EYKENS', 'Renée', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-1500m-4')::uuid, '1500m', 'stade', NULL, '4''23"07', 263.07, '', 1997, 'LUX', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-1500m-4:0')::uuid, md5('stade-1500m-4')::uuid, 'SALT', 'Christa', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-3000m-5')::uuid, '3000m', 'stade', NULL, '9''24"75', 564.75, '', 2023, 'LUX', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-3000m-5:0')::uuid, md5('stade-3000m-5')::uuid, 'HOFFMANN', 'Vera', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-5000m-6')::uuid, '5000m', 'stade', NULL, '17''17"16', 1037.16, '', 0, 'LUX', true, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-5000m-6:0')::uuid, md5('stade-5000m-6')::uuid, 'SCHMOETTEN', 'Pascale', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-10000m-7')::uuid, '10000m', 'stade', NULL, '35''45"21', 2145.21, '', 2007, 'LUX', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-10000m-7:0')::uuid, md5('stade-10000m-7')::uuid, 'MAY', 'Liz', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-100m-h-8')::uuid, '100m-h', 'stade', NULL, '13"46', 13.46, '', 1996, 'LUX', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-100m-h-8:0')::uuid, md5('stade-100m-h-8')::uuid, 'LINSTER', 'Véronique', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-400m-h-9')::uuid, '400m-h', 'stade', NULL, '60"84', 60.84, '', 1988, 'NOR', true, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-400m-h-9:0')::uuid, md5('stade-400m-h-9')::uuid, 'SYVERTSEN', 'Barbro', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-2000m-st-10')::uuid, '2000m-st', 'stade', NULL, '7''17"08', 437.08, '', 2000, 'LUX', true, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-2000m-st-10:0')::uuid, md5('stade-2000m-st-10')::uuid, 'HANSEN', 'Véronique', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-3000m-st-11')::uuid, '3000m-st', 'stade', NULL, '11''19"88', 679.88, '', 2023, 'LUX', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-3000m-st-11:0')::uuid, md5('stade-3000m-st-11')::uuid, 'GLODEN', 'Jenny', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-4x100m-12')::uuid, '4x100m', 'stade', NULL, '46"84', 46.84, '', 1988, 'GER', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-4x100m-12:0')::uuid, md5('stade-4x100m-12')::uuid, 'RHENANIE', 'Sélection', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-hauteur-13')::uuid, 'hauteur', 'stade', NULL, '1,88 m', 1.88, '', 1990, 'NED', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-hauteur-13:0')::uuid, md5('stade-hauteur-13')::uuid, 'VANDERWEIDE', 'Monique', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-longueur-14')::uuid, 'longueur', 'stade', NULL, '6,35 m', 6.35, '', 1996, 'GER', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-longueur-14:0')::uuid, md5('stade-longueur-14')::uuid, 'HORT', 'Stéphanie', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-perche-15')::uuid, 'perche', 'stade', NULL, '4,10 m', 4.1, '', 2015, 'GER', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-perche-15:0')::uuid, md5('stade-perche-15')::uuid, 'GADSCHEW', 'Kristina', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-triple-16')::uuid, 'triple', 'stade', NULL, '12,65 m', 12.65, '', 1998, 'SLO', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-triple-16:0')::uuid, md5('stade-triple-16')::uuid, 'VELDAKOVA', 'Dana', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-disque-17')::uuid, 'disque', 'stade', NULL, '50,94 m', 50.94, '', 1996, 'FRA', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-disque-17:0')::uuid, md5('stade-disque-17')::uuid, 'KELHETTER', 'Danièle', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-javelot-18')::uuid, 'javelot', 'stade', NULL, '58,20 m', 58.2, '', 1996, 'FRA', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-javelot-18:0')::uuid, md5('stade-javelot-18')::uuid, 'AUZEL', 'Nadine', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-marteau-19')::uuid, 'marteau', 'stade', NULL, '42,87 m', 42.87, '', 1998, 'FIN', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-marteau-19:0')::uuid, md5('stade-marteau-19')::uuid, 'SIPILA', 'Pavivi', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-poids-20')::uuid, 'poids', 'stade', NULL, '14,94 m', 14.94, '', 1988, 'GER', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-poids-20:0')::uuid, md5('stade-poids-20')::uuid, 'BICK', 'Katja', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-heptathlon-21')::uuid, 'heptathlon', 'stade', NULL, '5 515 P', 5515, '', 1990, 'GER', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-heptathlon-21:0')::uuid, md5('stade-heptathlon-21')::uuid, 'STRASCHEWSKI', 'Anke', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-100m-22')::uuid, '100m', 'stade', NULL, '10"45', 10.45, '', 1993, 'NED', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-100m-22:0')::uuid, md5('stade-100m-22')::uuid, 'v.d. VLOOT', 'Regilio', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-200m-23')::uuid, '200m', 'stade', NULL, '21"00', 21, '', 1992, 'FRA', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-200m-23:0')::uuid, md5('stade-200m-23')::uuid, 'LOMBA', 'Herman', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-400m-24')::uuid, '400m', 'stade', NULL, '46"89', 46.89, '', 1994, 'BEL', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-400m-24:0')::uuid, md5('stade-400m-24')::uuid, 'DOLLENDORF', 'Marc', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-800m-25')::uuid, '800m', 'stade', NULL, '1''47"86', 107.86, '', 1989, 'FRA', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-800m-25:0')::uuid, md5('stade-800m-25')::uuid, 'HEGESIPPE', 'Joel', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-1000m-26')::uuid, '1000m', 'stade', NULL, '2''25"15', 145.15, '', 1999, 'LUX', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-1000m-26:0')::uuid, md5('stade-1000m-26')::uuid, 'CALVO', 'Carlos', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-1500m-27')::uuid, '1500m', 'stade', NULL, '3''41"70', 221.7, '', 2002, 'KEN', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-1500m-27:0')::uuid, md5('stade-1500m-27')::uuid, 'KIPRUTO', 'Sammy', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-1-mile-28')::uuid, '1-mile', 'stade', NULL, '4''08"63', 248.63, '', 2020, 'GER', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-1-mile-28:0')::uuid, md5('stade-1-mile-28')::uuid, 'WAMMETSBERGER', 'Felix', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-3000m-29')::uuid, '3000m', 'stade', NULL, '8''03"93', 483.93, '', 2023, 'LUX', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-3000m-29:0')::uuid, md5('stade-3000m-29')::uuid, 'GRETHEN', 'Charles', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-5000m-30')::uuid, '5000m', 'stade', NULL, '13''58"20', 838.2, '', 1990, 'NED', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-5000m-30:0')::uuid, md5('stade-5000m-30')::uuid, 'DIRKS', 'Tonnie', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-10000m-31')::uuid, '10000m', 'stade', NULL, '28''48"90', 1728.9, '', 1985, 'LUX', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-10000m-31:0')::uuid, md5('stade-10000m-31')::uuid, 'GLODEN', 'Justin', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-20000m-32')::uuid, '20000m', 'stade', NULL, '1h00''04"60', 3604.6, '', 1985, 'LUX', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-20000m-32:0')::uuid, md5('stade-20000m-32')::uuid, 'GLODEN', 'Justin', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-1-stonn-33')::uuid, '1-stonn', 'stade', NULL, '19 970 m', 19970, '', 1985, 'LUX', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-1-stonn-33:0')::uuid, md5('stade-1-stonn-33')::uuid, 'GLODEN', 'Justin', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-110m-h-34')::uuid, '110m-h', 'stade', NULL, '13"88', 13.88, '', 1990, 'FRA', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-110m-h-34:0')::uuid, md5('stade-110m-h-34')::uuid, 'CLARICO', 'Vincent', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-400m-h-35')::uuid, '400m-h', 'stade', NULL, '52"80', 52.8, '', 1988, 'ISL', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-400m-h-35:0')::uuid, md5('stade-400m-h-35')::uuid, 'EDSON', 'Egil', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-3000m-st-36')::uuid, '3000m-st', 'stade', NULL, '8''55"54', 535.54, '', 1984, 'LUX', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-3000m-st-36:0')::uuid, md5('stade-3000m-st-36')::uuid, 'HOESER', 'Francis', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-10km-marche-37')::uuid, '10km-marche', 'stade', NULL, '43''39"20', 2619.2, '', 1988, 'LUX', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-10km-marche-37:0')::uuid, md5('stade-10km-marche-37')::uuid, 'SOWA', 'Marco', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-4x100m-38')::uuid, '4x100m', 'stade', NULL, '40"97', 40.97, '', 1993, 'GER', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-4x100m-38:0')::uuid, md5('stade-4x100m-38')::uuid, 'SAARE', 'Sélection', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-4x400m-39')::uuid, '4x400m', 'stade', NULL, '3''15"95', 195.95, '', 1988, 'ISL', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-4x400m-39:0')::uuid, md5('stade-4x400m-39')::uuid, 'NATIONALE', 'Equipe', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-hauteur-40')::uuid, 'hauteur', 'stade', NULL, '2,19 m', 2.19, '', 1984, 'LUX', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-hauteur-40:0')::uuid, md5('stade-hauteur-40')::uuid, 'CONZEMIUS', 'Raymond', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-longueur-41')::uuid, 'longueur', 'stade', NULL, '7,79 m', 7.79, '', 1993, 'FRA', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-longueur-41:0')::uuid, md5('stade-longueur-41')::uuid, 'DIPPE', 'Didier', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-triple-42')::uuid, 'triple', 'stade', NULL, '15,40 m', 15.4, '', 1990, 'GER', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-triple-42:0')::uuid, md5('stade-triple-42')::uuid, 'BÖHM', 'Stephan', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-perche-43')::uuid, 'perche', 'stade', NULL, '5,50 m', 5.5, '', 1993, 'GER', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-perche-43:0')::uuid, md5('stade-perche-43')::uuid, 'TIWONTSCHIK', 'Andrej', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-disque-44')::uuid, 'disque', 'stade', NULL, '59,30 m', 59.3, '', 1988, 'ISL', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-disque-44:0')::uuid, md5('stade-disque-44')::uuid, 'HAFTSTEINSSON', 'Vestein', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-poids-45')::uuid, 'poids', 'stade', NULL, '20,11 m', 20.11, '', 2023, 'LUX', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-poids-45:0')::uuid, md5('stade-poids-45')::uuid, 'BERTEMES', 'Bob', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-javelot-46')::uuid, 'javelot', 'stade', NULL, '77,22 m', 77.22, '', 1993, 'NED', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-javelot-46:0')::uuid, md5('stade-javelot-46')::uuid, 'VAN LIESHOUT', 'Johan', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-marteau-47')::uuid, 'marteau', 'stade', NULL, '71,36 m', 71.36, '', 1988, 'FRA', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-marteau-47:0')::uuid, md5('stade-marteau-47')::uuid, 'PIOLANTI', 'Raphael', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-pentathlon-48')::uuid, 'pentathlon', 'stade', NULL, '3 300 P', 3300, '', 1988, 'GER', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-pentathlon-48:0')::uuid, md5('stade-pentathlon-48')::uuid, 'BRANDT', 'Bert', 1) on conflict (id) do nothing;
insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (md5('stade-decathlon-49')::uuid, 'decathlon', 'stade', NULL, '7 699 P', 7699, '', 1991, 'GER', false, true)
on conflict (id) do nothing;
insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5('stade-decathlon-49:0')::uuid, md5('stade-decathlon-49')::uuid, 'MULLER', 'Frank', 1) on conflict (id) do nothing;

-- Bestleistungen nach Kategorie (§9).
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-4x75m-0')::uuid, 'U16', 'piste', 'f', '4x75m', '4 X 75 m', 'U16', '41"08', 41.08, '[{"lastName":"HAYEN","firstName":"Chantal"},{"lastName":"LOSCH","firstName":"Lisi"},{"lastName":"HARDY","firstName":"Athèle"},{"lastName":"KIEFFER","firstName":"Tammy"}]'::jsonb, 1998, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-4x100m-1')::uuid, 'U23', 'piste', 'f', '4x100m', '4 X 100 m', 'U23', '47"18', 47.18, '[{"lastName":"RAUSCH","firstName":"Victoria"},{"lastName":"BAUER","firstName":"Annäis"},{"lastName":"ZENS","firstName":"Anouk"},{"lastName":"JONES","firstName":"Laurenc"}]'::jsonb, 2014, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-4x100m-2')::uuid, 'U20', 'piste', 'f', '4x100m', '4 X 100 m', 'U20', '48"25', 48.25, '[{"lastName":"KRAMER","firstName":"Hannah"},{"lastName":"GAENG","firstName":"Camille"},{"lastName":"GRANGER","firstName":"Uyana"},{"lastName":"REDING","firstName":"Alexandra"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-4x100m-3')::uuid, 'U18', 'piste', 'f', '4x100m', '4 X 100 m', 'U18', '49"47', 49.47, '[{"lastName":"MICHEL","firstName":"Véronique"},{"lastName":"ZENS","firstName":"Anouk"},{"lastName":"RAUSCH","firstName":"Victoria"},{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2013, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-4x100m-4')::uuid, 'U16', 'piste', 'f', '4x100m', '4 x 100 m', 'U16', '50"14', 50.14, '[{"lastName":"SCHMIT","firstName":"Cathy"},{"lastName":"REISER","firstName":"Anne"},{"lastName":"ZIMMER","firstName":"Cathy"},{"lastName":"ZENS","firstName":"Anouk"}]'::jsonb, 2012, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-4x400m-5')::uuid, 'U18', 'piste', 'f', '4x400m', '4 X 400 m', 'U18', '4''03"25', 243.25, '[{"lastName":"SCHMT","firstName":"Cathy"},{"lastName":"ZIMMER","firstName":"Cathie"},{"lastName":"ZENS","firstName":"Anouk"},{"lastName":"REISER","firstName":"Anne"}]'::jsonb, 2012, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-4x400m-6')::uuid, 'U20', 'piste', 'f', '4x400m', '4 X 400 m', 'U20', '4''01"98', 241.98, '[{"lastName":"FOLSCHEID","firstName":"Joy"},{"lastName":"GLODEN","firstName":"Jenny"},{"lastName":"BAUER","firstName":"Annaïs"},{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2012, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-4x400m-7')::uuid, 'U23', 'piste', 'f', '4x400m', '4 X 400 m', 'U20', '4''01"98', 241.98, '[{"lastName":"FOLSCHEID","firstName":"Joy"},{"lastName":"GLODEN","firstName":"Jenny"},{"lastName":"BAUER","firstName":"Annaïs"},{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2012, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-3x800m-8')::uuid, 'U23', 'piste', 'f', '3x800m', '3 X 800 m', 'U18', '7''03"30', 423.3, '[{"lastName":"SCHARTZ","firstName":"Joanne"},{"lastName":"GLOESENER","firstName":"Jill"},{"lastName":"GLODEN","firstName":"Jenny"}]'::jsonb, 2009, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-3x800m-9')::uuid, 'U20', 'piste', 'f', '3x800m', '3 X 800 m', 'U18', '7''03"30', 423.3, '[{"lastName":"SCHARTZ","firstName":"Joanne"},{"lastName":"GLOESENER","firstName":"Jill"},{"lastName":"GLODEN","firstName":"Jenny"}]'::jsonb, 2009, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-3x800m-10')::uuid, 'U18', 'piste', 'f', '3x800m', '3 X 800 m', 'U18', '7''03"30', 423.3, '[{"lastName":"SCHARTZ","firstName":"Joanne"},{"lastName":"GLOESENER","firstName":"Jill"},{"lastName":"GLODEN","firstName":"Jenny"}]'::jsonb, 2009, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-3x800m-11')::uuid, 'U16', 'piste', 'f', '3x800m', '3 X 800 m', 'U16', '7''12"82', 432.82, '[{"lastName":"SCHARTZ","firstName":"Joanne"},{"lastName":"PENNING","firstName":"Yoon"},{"lastName":"GLODEN","firstName":"Jenny"}]'::jsonb, 2008, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-100m-0')::uuid, 'U23', 'piste', 'f', '100m', '100 m', 'U20', '11"94', 11.94, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2015, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-150m-1')::uuid, 'U23', 'piste', 'f', '150m', '150 m', 'U23', '19"28', 19.28, '[{"lastName":"Hayen","firstName":"Chantal"}]'::jsonb, 2001, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-200m-2')::uuid, 'U23', 'piste', 'f', '200m', '200 m', 'U20', '24"58', 24.58, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2015, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-300m-3')::uuid, 'U23', 'piste', 'f', '300m', '300 m', 'U20', '40"31', 40.31, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2015, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-400m-4')::uuid, 'U23', 'piste', 'f', '400m', '400 m', 'U18', '56"99', 56.99, '[{"lastName":"CICCONE","firstName":"Julia"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-500m-5')::uuid, 'U23', 'piste', 'f', '500m', '500 m', 'U23', '1''18"31', 78.31, '[{"lastName":"GLODEN","firstName":"Jenny"}]'::jsonb, 2013, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-600m-6')::uuid, 'U23', 'piste', 'f', '600m', '600 m', 'U16', '1''37"59', 97.59, '[{"lastName":"GLODEN","firstName":"Jenny"}]'::jsonb, 2008, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-800m-7')::uuid, 'U23', 'piste', 'f', '800m', '800 m', 'U23', '2''07"50', 127.5, '[{"lastName":"HOFFMANN","firstName":"Vera"}]'::jsonb, 2017, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-1000m-8')::uuid, 'U23', 'piste', 'f', '1000m', '1 000 m', 'U23', '2''43"87', 163.87, '[{"lastName":"HOFFMAN","firstName":"Vera"}]'::jsonb, 2017, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-1500m-9')::uuid, 'U23', 'piste', 'f', '1500m', '1 500 m', 'U23', '4''14"51', 254.51, '[{"lastName":"HOFFMANN","firstName":"Vera"}]'::jsonb, 2018, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-1-mile-10')::uuid, 'U23', 'piste', 'f', '1-mile', '1 Mile', 'U23', '5''02"38', 302.38, '[{"lastName":"MELLINA","firstName":"Martine"}]'::jsonb, 2012, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-2000m-11')::uuid, 'U23', 'piste', 'f', '2000m', '2 000 m', 'U16', '6''56"27', 416.27, '[{"lastName":"GLOESENER","firstName":"Jil"}]'::jsonb, 2007, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-5000m-12')::uuid, 'U23', 'piste', 'f', '5000m', '5 000 m', 'U18', '19''55"06', 1195.06, '[{"lastName":"KOTECKA","firstName":"Marie Anna"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-100m-h-13')::uuid, 'U23', 'piste', 'f', '100m-h', '100 m h.', 'U23', '13"84', 13.84, '[{"lastName":"RAUSCH","firstName":"Victoria"}]'::jsonb, 2018, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-400m-h-14')::uuid, 'U23', 'piste', 'f', '400m-h', '400 m h.', 'U20', '58"54', 58.54, '[{"lastName":"GRANGER","firstName":"Uyana"}]'::jsonb, 2026, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-2000m-st-15')::uuid, 'U23', 'piste', 'f', '2000m-st', '2 000 m St.', 'U18', '6''56"64', 416.64, '[{"lastName":"LOPES","firstName":"Elena"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-3000m-st-16')::uuid, 'U23', 'piste', 'f', '3000m-st', '3 000 m St.', 'U23', '12''18"84', 738.84, '[{"lastName":"HANSEN","firstName":"Véronique"}]'::jsonb, 2002, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-longueur-17')::uuid, 'U23', 'piste', 'f', 'longueur', 'Longueur', 'U20', '5,99 m', 5.99, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2014, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-triple-18')::uuid, 'U23', 'piste', 'f', 'triple', 'Dreisprong', 'U20', '10,50 m', 10.5, '[{"lastName":"ZENS","firstName":"Cathie"}]'::jsonb, 2011, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-hauteur-19')::uuid, 'U23', 'piste', 'f', 'hauteur', 'Hauteur', 'U20', '1,74 m', 1.74, '[{"lastName":"ZIMMER","firstName":"Cathy"}]'::jsonb, 2016, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-perche-20')::uuid, 'U23', 'piste', 'f', 'perche', 'Perche', 'U23 U18', '3,30 m', 3.3, '[{"lastName":"WEBER","firstName":"Fabienne"},{"lastName":"SCHMIT","firstName":"Cathy"}]'::jsonb, 2013, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-poids-4kg-21')::uuid, 'U23', 'piste', 'f', 'poids-4kg', 'Poids 4 Kg', 'U20', '14,06 m', 14.06, '[{"lastName":"SCHARTZ","firstName":"Kim"}]'::jsonb, 2007, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-disque-22')::uuid, 'U23', 'piste', 'f', 'disque', 'Disque 1 kg', 'U20', '35,76 m', 35.76, '[{"lastName":"MICHEL","firstName":"Véronique"}]'::jsonb, 2015, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-javelot-23')::uuid, 'U23', 'piste', 'f', 'javelot', 'Javelot 600 Gr.', 'U20', '43,76 m', 43.76, '[{"lastName":"MICHEL","firstName":"Véronique"}]'::jsonb, 2015, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-marteau-24')::uuid, 'U23', 'piste', 'f', 'marteau', 'Marteau 4 Kg', 'U23', '47,90 m', 47.9, '[{"lastName":"SCHARTZ","firstName":"Kim"}]'::jsonb, 2008, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U23-heptathlon-25')::uuid, 'U23', 'piste', 'f', 'heptathlon', 'Siebenkampf', 'U20', '4 399 P', 4399, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2014, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-100m-0')::uuid, 'U20', 'piste', 'f', '100m', '100 m', 'U20', '11"94', 11.94, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2015, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-150m-1')::uuid, 'U20', 'piste', 'f', '150m', '150 m', 'U18', '19"28', 19.28, '[{"lastName":"HAYEN","firstName":"Chantal"}]'::jsonb, 2001, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-200m-2')::uuid, 'U20', 'piste', 'f', '200m', '200 m', 'U20', '24"58', 24.58, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2015, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-300m-3')::uuid, 'U20', 'piste', 'f', '300m', '300 m', 'U20', '40"31', 40.31, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2015, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-400m-4')::uuid, 'U20', 'piste', 'f', '400m', '400 m', 'U18', '56"99', 56.99, '[{"lastName":"CICCONE","firstName":"Julia"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-500m-5')::uuid, 'U20', 'piste', 'f', '500m', '500 m', 'U20', '1''24"22', 84.22, '[{"lastName":"SCHARTZ","firstName":"Joanne"}]'::jsonb, 2012, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-600m-6')::uuid, 'U20', 'piste', 'f', '600m', '600 m', 'U18', '1''35"21', 95.21, '[{"lastName":"CICCONE","firstName":"Julia"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-800m-7')::uuid, 'U20', 'piste', 'f', '800m', '800 m', 'U20', '2''09"54', 129.54, '[{"lastName":"HOFFMANN","firstName":"Vera"}]'::jsonb, 2015, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-1000m-8')::uuid, 'U20', 'piste', 'f', '1000m', '1 000 m', 'U20', '2''49"03', 169.03, '[{"lastName":"HOFFMANN","firstName":"Vera"}]'::jsonb, 2015, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-1500m-9')::uuid, 'U20', 'piste', 'f', '1500m', '1 500 m', 'U20', '4''25"87', 265.87, '[{"lastName":"HOFFMANN","firstName":"Vera"}]'::jsonb, 2015, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-2000m-10')::uuid, 'U20', 'piste', 'f', '2000m', '2 000 m', 'U16', '6''56"27', 416.27, '[{"lastName":"GLOESENER","firstName":"Jil"}]'::jsonb, 2007, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-3000m-11')::uuid, 'U20', 'piste', 'f', '3000m', '3 000 m', 'U20', '10''01"50', 601.5, '[{"lastName":"HOFFMAN","firstName":"Vera"}]'::jsonb, 2015, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-5000m-12')::uuid, 'U20', 'piste', 'f', '5000m', '5 000 m', 'U18', '19''55"04', 1195.04, '[{"lastName":"KOTECKÁ","firstName":"Marie Anna"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-10000m-13')::uuid, 'U20', 'piste', 'f', '10000m', '10 000 m', 'U20', '46''11"43', 2771.43, '[{"lastName":"HANSEN","firstName":"Véronique"}]'::jsonb, 1998, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-100m-h-14')::uuid, 'U20', 'piste', 'f', '100m-h', '100 m h.', 'U18', '14"54', 14.54, '[{"lastName":"KRAMER","firstName":"Hannah"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-400m-h-15')::uuid, 'U20', 'piste', 'f', '400m-h', '400 m h.', 'U20', '58"54', 58.54, '[{"lastName":"GRANGER","firstName":"Uyana"}]'::jsonb, 2026, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-2000m-st-16')::uuid, 'U20', 'piste', 'f', '2000m-st', '2 000 m St.', 'U18', '6''56"64', 416.64, '[{"lastName":"LOPES","firstName":"Elena"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-3000m-st-17')::uuid, 'U20', 'piste', 'f', '3000m-st', '3.000 m St.', 'U18', '12''20"74', 740.74, '[{"lastName":"SACKETT","firstName":"Verity"}]'::jsonb, 2026, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-longueur-18')::uuid, 'U20', 'piste', 'f', 'longueur', 'L ongueur', 'U20', '5,99 m', 5.99, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2014, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-triple-19')::uuid, 'U20', 'piste', 'f', 'triple', 'Dreisprong', 'U20', '11,10 m', 11.1, '[{"lastName":"ZENS","firstName":"Cathie"}]'::jsonb, 2012, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-hauteur-20')::uuid, 'U20', 'piste', 'f', 'hauteur', 'Hauteur', 'U18', '1,71 m', 1.71, '[{"lastName":"ZIMMER","firstName":"Cathy"}]'::jsonb, 2014, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-perche-21')::uuid, 'U20', 'piste', 'f', 'perche', 'Perche', 'U18', '3,30 m', 3.3, '[{"lastName":"S CHMIT","firstName":"Cathy"}]'::jsonb, 2013, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-poids-4kg-22')::uuid, 'U20', 'piste', 'f', 'poids-4kg', 'Poids 4 Kg', 'U20', '14,06 m', 14.06, '[{"lastName":"SCHARTZ","firstName":"Kim"}]'::jsonb, 2007, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-disque-23')::uuid, 'U20', 'piste', 'f', 'disque', 'Disque 1Kg', 'U18', '34,07 m', 34.07, '[{"lastName":"MICHEL","firstName":"Véronique"}]'::jsonb, 2012, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-javelot-24')::uuid, 'U20', 'piste', 'f', 'javelot', 'Javelot 600 Gr.', 'U20', '43,44 m', 43.44, '[{"lastName":"MICHEL","firstName":"Véronique"}]'::jsonb, 2014, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-marteau-25')::uuid, 'U20', 'piste', 'f', 'marteau', 'Marteau 4 Kg', 'U20', '46,71 m', 46.71, '[{"lastName":"SCHARTZ","firstName":"Kim"}]'::jsonb, 2007, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U20-heptathlon-26')::uuid, 'U20', 'piste', 'f', 'heptathlon', 'Heptathlon', 'U20', '4 399 P', 4399, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2014, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-100m-0')::uuid, 'U18', 'piste', 'f', '100m', '100 m', 'U18', '12"07', 12.07, '[{"lastName":"GAENG","firstName":"Camille"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-150m-1')::uuid, 'U18', 'piste', 'f', '150m', '150 m', 'U18', '19"28', 19.28, '[{"lastName":"HAYEN","firstName":"Chantal"}]'::jsonb, 2001, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-200m-2')::uuid, 'U18', 'piste', 'f', '200m', '200 m', 'U18', '24"92', 24.92, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2013, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-300m-3')::uuid, 'U18', 'piste', 'f', '300m', '300 m', 'U16', '40"97', 40.97, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2011, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-400m-4')::uuid, 'U18', 'piste', 'f', '400m', '400 m', 'U18', '56"99', 56.99, '[{"lastName":"CICCONE","firstName":"Julia"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-500m-5')::uuid, 'U18', 'piste', 'f', '500m', '500 m', 'U16', '1''27"98', 87.98, '[{"lastName":"BAUER","firstName":"Fanny"}]'::jsonb, 2012, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-600m-6')::uuid, 'U18', 'piste', 'f', '600m', '600 m', 'U18', '1''35"21', 95.21, '[{"lastName":"CICCONE","firstName":"Julia"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-800m-7')::uuid, 'U18', 'piste', 'f', '800m', '800 m', 'U18', '2''10"73', 130.73, '[{"lastName":"CICCONE","firstName":"Julia"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-1000m-8')::uuid, 'U18', 'piste', 'f', '1000m', '1 000 m', 'U18', '2''55"84', 175.84, '[{"lastName":"SCHARTZ","firstName":"Joanne"}]'::jsonb, 2010, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-1500m-9')::uuid, 'U18', 'piste', 'f', '1500m', '1 500 m', 'U18', '4''39"17', 279.17, '[{"lastName":"GLOESENER","firstName":"Jil"}]'::jsonb, 2008, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-2000m-10')::uuid, 'U18', 'piste', 'f', '2000m', '2 000 m', 'U16', '6''56"27', 416.27, '[{"lastName":"GLOESENER","firstName":"Jil"}]'::jsonb, 2007, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-3000m-11')::uuid, 'U18', 'piste', 'f', '3000m', '3 000 m', 'U18', '10''21"83', 621.83, '[{"lastName":"LOPES","firstName":"Elena"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-5000m-12')::uuid, 'U18', 'piste', 'f', '5000m', '5 000 m', 'U18', '19''55"06', 1195.06, '[{"lastName":"KOTECKA","firstName":"Marie Anna"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-100m-h-13')::uuid, 'U18', 'piste', 'f', '100m-h', '100 m h.', 'U18', '14"06', 14.06, '[{"lastName":"GRANGER","firstName":"Uyana"}]'::jsonb, 2025, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-300m-h-14')::uuid, 'U18', 'piste', 'f', '300m-h', '300 m h.', 'U18', '47"07', 47.07, '[{"lastName":"HAYEN","firstName":"Chantal"}]'::jsonb, 2000, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-400m-h-15')::uuid, 'U18', 'piste', 'f', '400m-h', '400 m h.', 'U18', '59"49', 59.49, '[{"lastName":"GRANGER","firstName":"Uyana"}]'::jsonb, 2025, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-2000m-st-16')::uuid, 'U18', 'piste', 'f', '2000m-st', '2.000 m St.', 'U18', '6''56"64', 416.64, '[{"lastName":"LOPES","firstName":"Elena"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-3000m-st-17')::uuid, 'U18', 'piste', 'f', '3000m-st', '3.000 m St.', 'U18', '12''20"74', 740.74, '[{"lastName":"SACKETT","firstName":"Verity"}]'::jsonb, 2026, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-longueur-18')::uuid, 'U18', 'piste', 'f', 'longueur', 'Lo ngueur', 'U18', '5,81 m', 5.8100000000000005, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2013, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-triple-19')::uuid, 'U18', 'piste', 'f', 'triple', 'Dreisprong', 'U18', '10,90 m', 10.9, '[{"lastName":"VAESSEN","firstName":"Matilda"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-hauteur-20')::uuid, 'U18', 'piste', 'f', 'hauteur', 'Hauteur', 'U18', '1,71 m', 1.71, '[{"lastName":"ZIMMER","firstName":"Cathy"}]'::jsonb, 2014, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-perche-21')::uuid, 'U18', 'piste', 'f', 'perche', 'Perche', 'U18', '3,30 m', 3.3, '[{"lastName":"SCHMIT","firstName":"Cathy"}]'::jsonb, 2013, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-poids-22')::uuid, 'U18', 'piste', 'f', 'poids', 'Poids 3 Kg', 'U18', '15,29 m', 15.29, '[{"lastName":"SCHARTZ","firstName":"Kim"}]'::jsonb, 2005, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-poids-4kg-23')::uuid, 'U18', 'piste', 'f', 'poids-4kg', 'Poids 4 Kg', 'U18', '13,69 m', 13.69, '[{"lastName":"SCHARTZ","firstName":"Kim"}]'::jsonb, 2005, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-disque-24')::uuid, 'U18', 'piste', 'f', 'disque', 'Disque 1Kg', 'U18', '34,07 m', 34.07, '[{"lastName":"MICHEL","firstName":"Véroniqe"}]'::jsonb, 2012, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-javelot-25')::uuid, 'U18', 'piste', 'f', 'javelot', 'Javelot 500 Gr', 'U18', '40,71 m', 40.71, '[{"lastName":"MICHEL","firstName":"Véronique"}]'::jsonb, 2013, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-javelot-26')::uuid, 'U18', 'piste', 'f', 'javelot', 'Javelot 600 Gr.', 'U18', '41,37 m', 41.37, '[{"lastName":"FOLSCHEID","firstName":"Joy"}]'::jsonb, 2011, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-marteau-27')::uuid, 'U18', 'piste', 'f', 'marteau', 'Marteau 3 Kg', 'U18', '33,18 m', 33.18, '[{"lastName":"MICHEL","firstName":"Véronique"}]'::jsonb, 2013, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-marteau-28')::uuid, 'U18', 'piste', 'f', 'marteau', 'Marteau 4 Kg', 'U18', '25,82 m', 25.82, '[{"lastName":"MICHEL","firstName":"Véronique"}]'::jsonb, 2013, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-heptathlon-29')::uuid, 'U18', 'piste', 'f', 'heptathlon', 'Heptathlon', 'U18', '4 250 P', 4250, '[{"lastName":"HAYEN","firstName":"Chantal"}]'::jsonb, 2000, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U18-decathlon-30')::uuid, 'U18', 'piste', 'f', 'decathlon', 'Décathlon', 'U18', '4 951 P', 4951, '[{"lastName":"MICHEL","firstName":"Véronique"}]'::jsonb, 2012, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-75m-0')::uuid, 'U16', 'piste', 'f', '75m', '75 m', 'U16', '9"84', 9.84, '[{"lastName":"SCHARTZ","firstName":"Kim"}]'::jsonb, 2002, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-100m-1')::uuid, 'U16', 'piste', 'f', '100m', '100 m', 'U16', '12"63', 12.63, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2011, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-150m-2')::uuid, 'U16', 'piste', 'f', '150m', '150 m', 'U16', '19"73', 19.73, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2010, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-300m-3')::uuid, 'U16', 'piste', 'f', '300m', '300 m', 'U16', '40"97', 40.97, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2011, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-400m-4')::uuid, 'U16', 'piste', 'f', '400m', '400 m', 'U16', '58"87', 58.87, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2011, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-500m-5')::uuid, 'U16', 'piste', 'f', '500m', '500 m', 'U16', '1''27"98', 87.98, '[{"lastName":"BAUER","firstName":"Fanny"}]'::jsonb, 2012, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-600m-6')::uuid, 'U16', 'piste', 'f', '600m', '600 m', 'U16', '1''37"59', 97.59, '[{"lastName":"GLODEN","firstName":"Jenny"}]'::jsonb, 2008, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-800m-7')::uuid, 'U16', 'piste', 'f', '800m', '800 m', 'U16', '2''17"36', 137.36, '[{"lastName":"GLODEN","firstName":"Jenny"}]'::jsonb, 2008, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-1000m-8')::uuid, 'U16', 'piste', 'f', '1000m', '1 000 m', 'U16', '2''59"93', 179.93, '[{"lastName":"SCHARTZ","firstName":"Joanne"}]'::jsonb, 2008, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-1500m-9')::uuid, 'U16', 'piste', 'f', '1500m', '1 500 m', 'U16', '4''46"23', 286.23, '[{"lastName":"SCHARTZ","firstName":"Joanne"}]'::jsonb, 2008, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-2000m-10')::uuid, 'U16', 'piste', 'f', '2000m', '2 000 m', 'U16', '6''56"27', 416.27, '[{"lastName":"GLOESENER","firstName":"Jil"}]'::jsonb, 2007, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-3000m-11')::uuid, 'U16', 'piste', 'f', '3000m', '3 000 m', 'U16', '11''06"29', 666.29, '[{"lastName":"SACKETT","firstName":"Verity"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-80m-h-12')::uuid, 'U16', 'piste', 'f', '80m-h', '80 m h.', 'U16', '12"35', 12.35, '[{"lastName":"PENNING","firstName":"Yoon"}]'::jsonb, 2008, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-100m-h-13')::uuid, 'U16', 'piste', 'f', '100m-h', '100 m h.0,76m', 'U16', '19"39', 19.39, '[{"lastName":"MICHEL","firstName":"Véronique"}]'::jsonb, 2011, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-300m-h-14')::uuid, 'U16', 'piste', 'f', '300m-h', '300 m h.', 'U16', '47"14', 47.14, '[{"lastName":"GAJIC","firstName":"Neda"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-400m-h-15')::uuid, 'U16', 'piste', 'f', '400m-h', '400 m h.', 'U16', '70"69', 70.69, '[{"lastName":"HAYEN","firstName":"Chantal"}]'::jsonb, 1999, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-2000m-st-16')::uuid, 'U16', 'piste', 'f', '2000m-st', '2 000 m Steeple', 'U16', '8''03"33', 483.33, '[{"lastName":"SACKETT","firstName":"Verity"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-longueur-17')::uuid, 'U16', 'piste', 'f', 'longueur', 'Longueur', 'U16', '5,46 m', 5.46, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2011, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-triple-18')::uuid, 'U16', 'piste', 'f', 'triple', 'Dreisprong', 'U16', '9,73 m', 9.73, '[{"lastName":"GRANGER","firstName":"Uyana"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-hauteur-19')::uuid, 'U16', 'piste', 'f', 'hauteur', 'Hauteur', 'U16', '1,68 m', 1.6800000000000002, '[{"lastName":"ZIMMER","firstName":"Cathie"}]'::jsonb, 2013, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-perche-20')::uuid, 'U16', 'piste', 'f', 'perche', 'Perche', 'U16', '2,80 m', 2.8, '[{"lastName":"SCHMIT","firstName":"Cathy"}]'::jsonb, 2012, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-poids-21')::uuid, 'U16', 'piste', 'f', 'poids', 'Poids 3 Kg', 'U16', '12,36 m', 12.36, '[{"lastName":"SCHARTZ","firstName":"Kim"}]'::jsonb, 2003, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-poids-4kg-22')::uuid, 'U16', 'piste', 'f', 'poids-4kg', 'Poids 4 Kg', 'U16', '9,16 m', 9.16, '[{"lastName":"MICHEL","firstName":"Véronique"}]'::jsonb, 2011, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-disque-23')::uuid, 'U16', 'piste', 'f', 'disque', 'Disque 750 Gr.', 'U16', '36,93 m', 36.93, '[{"lastName":"MICHEL","firstName":"Véronique"}]'::jsonb, 2011, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-disque-24')::uuid, 'U16', 'piste', 'f', 'disque', 'Disque 1 kg', 'U16', '25,93 m', 25.93, '[{"lastName":"MICHEL","firstName":"Véronique"}]'::jsonb, 2011, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-javelot-25')::uuid, 'U16', 'piste', 'f', 'javelot', 'Javelot 600 Gr.', 'U16', '35,31 m', 35.31, '[{"lastName":"MICHEL","firstName":"Véronique"}]'::jsonb, 2011, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-javelot-26')::uuid, 'U16', 'piste', 'f', 'javelot', 'Javelot 400 Gr', 'U16', '41,43 m', 41.43, '[{"lastName":"SCHARTZ","firstName":"Kim"}]'::jsonb, 2003, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-ball-27')::uuid, 'U16', 'piste', 'f', 'ball', 'Ball 200 Gr', 'U16', '50,50 m', 50.5, '[{"lastName":"MICHEL","firstName":"Véronique"}]'::jsonb, 2010, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-marteau-28')::uuid, 'U16', 'piste', 'f', 'marteau', 'Marteau 3 Kg', 'U16', '24,84 m', 24.84, '[{"lastName":"MICHEL","firstName":"Véronique"}]'::jsonb, 2011, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-marteau-29')::uuid, 'U16', 'piste', 'f', 'marteau', 'Marteau 4 Kg', 'U16', '21,47 m', 21.47, '[{"lastName":"MICHEL","firstName":"Véronique"}]'::jsonb, 2011, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-heptathlon-30')::uuid, 'U16', 'piste', 'f', 'heptathlon', 'Heptathlon', 'U16', '4 003 P', 4003, '[{"lastName":"GRANGER","firstName":"Uyana"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U16-decathlon-31')::uuid, 'U16', 'piste', 'f', 'decathlon', 'Décathlon min', 'U16', '3 922 P', 3922, '[{"lastName":"MICHEL","firstName":"Véronique"}]'::jsonb, 2011, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U14-50m-0')::uuid, 'U14', 'piste', 'f', '50m', '50 m', 'U14', '7"22', 7.22, '[{"lastName":"SCHARTZ","firstName":"Kim"}]'::jsonb, 2001, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U14-75m-1')::uuid, 'U14', 'piste', 'f', '75m', '75 m', 'U14', '10"31', 10.31, '[{"lastName":"SCHARTZ","firstName":"Kim"}]'::jsonb, 2001, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U14-80m-2')::uuid, 'U14', 'piste', 'f', '80m', '80 m', 'U14', '10"88', 10.88, '[{"lastName":"SCHARTZ","firstName":"Kim"}]'::jsonb, 2001, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U14-100m-3')::uuid, 'U14', 'piste', 'f', '100m', '100 m', 'U14', '13"47', 13.47, '[{"lastName":"SCHARTZ","firstName":"Kim"}]'::jsonb, 2001, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U14-150m-4')::uuid, 'U14', 'piste', 'f', '150m', '150 m', 'U14', '20"66', 20.66, '[{"lastName":"SCHARTZ","firstName":"Kim"}]'::jsonb, 2001, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U14-200m-5')::uuid, 'U14', 'piste', 'f', '200m', '200 m', 'U14', '28"51', 28.51, '[{"lastName":"SCHARTZ","firstName":"Kim"}]'::jsonb, 2001, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U14-300m-6')::uuid, 'U14', 'piste', 'f', '300m', '300 m', 'U14', '45"23', 45.23, '[{"lastName":"SCHARTZ","firstName":"Kim"}]'::jsonb, 2001, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U14-400m-7')::uuid, 'U14', 'piste', 'f', '400m', '400 m', 'U12', '1''21"01', 81.01, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2004, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U14-500m-8')::uuid, 'U14', 'piste', 'f', '500m', '500 m', 'U14', '1''28"24', 88.24, '[{"lastName":"HAYEN","firstName":"Marthe"}]'::jsonb, 2002, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U14-600m-9')::uuid, 'U14', 'piste', 'f', '600m', '600 m', 'U14', '1''45"76', 105.76, '[{"lastName":"UDELHOVEN","firstName":"Katharina"}]'::jsonb, 1988, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U14-800m-10')::uuid, 'U14', 'piste', 'f', '800m', '800 m', 'U14', '2''29"80', 149.8, '[{"lastName":"BAUM","firstName":"Shannon"}]'::jsonb, 2008, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U14-1000m-11')::uuid, 'U14', 'piste', 'f', '1000m', '1 000 m', 'U14', '3''13"82', 193.82, '[{"lastName":"MAJERUS","firstName":"Diane"}]'::jsonb, 1993, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U14-1500m-12')::uuid, 'U14', 'piste', 'f', '1500m', '1 500 m', 'U12', '6''19"72', 379.72, '[{"lastName":"MICHEL","firstName":"Véronique"}]'::jsonb, 2007, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U14-2000m-13')::uuid, 'U14', 'piste', 'f', '2000m', '2 000 m', 'U14', '7''18"08', 438.08, '[{"lastName":"GLOESENER","firstName":"Jil"}]'::jsonb, 2005, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U14-60m-h-14')::uuid, 'U14', 'piste', 'f', '60m-h', '60 m H', 'U14', '10"24', 10.24, '[{"lastName":"SCHMIT","firstName":"Cathie"}]'::jsonb, 2010, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U14-100m-h-15')::uuid, 'U14', 'piste', 'f', '100m-h', '100 m H', 'U14', '22"46', 22.46, '[{"lastName":"MICHEL","firstName":"Véronique"}]'::jsonb, 2008, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U14-longueur-16')::uuid, 'U14', 'piste', 'f', 'longueur', 'Longueur', 'U14', '5,20 m', 5.2, '[{"lastName":"SCHARTZ","firstName":"Kim"}]'::jsonb, 2001, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U14-hauteur-17')::uuid, 'U14', 'piste', 'f', 'hauteur', 'Hauteur', 'U14', '1,56 m', 1.56, '[{"lastName":"ZENS","firstName":"Cathie"}]'::jsonb, 2007, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U14-ball-18')::uuid, 'U14', 'piste', 'f', 'ball', 'Ball 200 gr', 'U14', '44,00 m', 44, '[{"lastName":"MICHEL","firstName":"Véronique"}]'::jsonb, 2008, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U14-disque-19')::uuid, 'U14', 'piste', 'f', 'disque', 'Disque Scol', 'U14', '21,25 m', 21.25, '[{"lastName":"SCHARTZ","firstName":"Kim"}]'::jsonb, 2001, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U14-javelot-20')::uuid, 'U14', 'piste', 'f', 'javelot', 'Javelot 400 Gr', 'U14', '35,25 m', 35.25, '[{"lastName":"MICHEL","firstName":"Véronique"}]'::jsonb, 2008, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U14-poids-21')::uuid, 'U14', 'piste', 'f', 'poids', 'Poids 2 Kg', 'U14', '12,06 m', 12.06, '[{"lastName":"SCHARTZ","firstName":"Kim"}]'::jsonb, 2001, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U14-poids-22')::uuid, 'U14', 'piste', 'f', 'poids', 'Poids 3 Kg', 'U14 U14', '7,85 m', 7.85, '[{"lastName":"MICHEL","firstName":"Véronique"},{"lastName":"LUDWIG","firstName":"Marie"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U14-decathlon-23')::uuid, 'U14', 'piste', 'f', 'decathlon', 'Décathlon Scol', 'U14', '2 539 P', 2539, '[{"lastName":"MICHEL","firstName":"Véronique"}]'::jsonb, 2008, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U14-4x50m-24')::uuid, 'U14', 'piste', 'f', '4x50m', '4 X 50 m', 'U14', '28"71', 28.71, '[{"lastName":"MARQUES","firstName":"Zoé"},{"lastName":"LEISTICO","firstName":"Lisa"},{"lastName":"KIRSCH","firstName":"Lola"},{"lastName":"JÜCH","firstName":"Nea"}]'::jsonb, 2022, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U14-4x75m-25')::uuid, 'U14', 'piste', 'f', '4x75m', '4 X 75 m', 'U14', '43"53', 43.53, '[{"lastName":"GLODEN","firstName":"Jenny"},{"lastName":"HOFFMANN","firstName":"Eva"},{"lastName":"PENNING","firstName":"Yoon"},{"lastName":"KIESCH","firstName":"Anne"}]'::jsonb, 2006, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U14-3x800m-26')::uuid, 'U14', 'piste', 'f', '3x800m', '3 X 800 m', 'U14', '7''51"75', 471.75, '[{"lastName":"HOFFMANN","firstName":"Vera"},{"lastName":"OCHS","firstName":"Julie"},{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2009, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-piste-U14-3x1000m-27')::uuid, 'U14', 'piste', 'f', '3x1000m', '3 X 1 000 m', 'U14', '11''13"65', 673.65, '[{"lastName":"GAJIC","firstName":"Neda"},{"lastName":"KORNELIS","firstName":"Lara"},{"lastName":"LUDWIG","firstName":"Marie"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U23-60m-0')::uuid, 'U23', 'indoor', 'f', '60m', '60 m', 'U20', '7"58', 7.58, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2015, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U23-200m-1')::uuid, 'U23', 'indoor', 'f', '200m', '200 m', 'U20', '24"74', 24.74, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2014, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U23-300m-2')::uuid, 'U23', 'indoor', 'f', '300m', '300 m', 'U20', '40"70', 40.7, '[{"lastName":"ZENS","firstName":"Annouk"}]'::jsonb, 2015, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U23-400m-3')::uuid, 'U23', 'indoor', 'f', '400m', '400 m', 'U20', '56"54', 56.54, '[{"lastName":"ZENS","firstName":"Anouk"}]'::jsonb, 2016, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U23-600m-4')::uuid, 'U23', 'indoor', 'f', '600m', '600 m', 'U18', '1''34"38', 94.38, '[{"lastName":"CICCONE","firstName":"Julia"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U23-800m-5')::uuid, 'U23', 'indoor', 'f', '800m', '800 m', 'U23', '2''07"97', 127.97, '[{"lastName":"HOFFMANN","firstName":"Vera"}]'::jsonb, 2018, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U23-1000m-6')::uuid, 'U23', 'indoor', 'f', '1000m', '1 000 m', 'U23', '2''49"87', 169.87, '[{"lastName":"HOFFMANN","firstName":"Vera"}]'::jsonb, 2017, false, true)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U23-1500m-7')::uuid, 'U23', 'indoor', 'f', '1500m', '1 500 m', 'U23', '4''29"62', 269.62, '[{"lastName":"HOFFMANN","firstName":"Vera"}]'::jsonb, 2016, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U23-3000m-8')::uuid, 'U23', 'indoor', 'f', '3000m', '3 000 m', 'U23', '9''30"28', 570.28, '[{"lastName":"HOFFMANN","firstName":"Vera"}]'::jsonb, 2018, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U23-60m-h-9')::uuid, 'U23', 'indoor', 'f', '60m-h', '60 m h.', 'U20', '8"49', 8.49, '[{"lastName":"GRANGER","firstName":"Uyana"}]'::jsonb, 2026, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U23-longueur-10')::uuid, 'U23', 'indoor', 'f', 'longueur', 'Weitsprong', 'U20', '5,95 m', 5.95, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2014, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U23-hauteur-11')::uuid, 'U23', 'indoor', 'f', 'hauteur', 'Héichsprong', 'U23', '1,76 m', 1.76, '[{"lastName":"ZIMMER","firstName":"Cathy"}]'::jsonb, 2017, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U23-triple-12')::uuid, 'U23', 'indoor', 'f', 'triple', 'Dreisprong', 'U20', '10,96 m', 10.96, '[{"lastName":"ZENS","firstName":"Cathy"}]'::jsonb, 2012, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U23-perche-13')::uuid, 'U23', 'indoor', 'f', 'perche', 'Perche', 'U23', '3,40 m', 3.4, '[{"lastName":"WEBER","firstName":"Fabienne"}]'::jsonb, 2009, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U23-poids-4kg-14')::uuid, 'U23', 'indoor', 'f', 'poids-4kg', 'Poids 4 Kg', 'U20', '13,56 m', 13.56, '[{"lastName":"SCHARTZ","firstName":"Kim"}]'::jsonb, 2007, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U23-4x200m-15')::uuid, 'U23', 'indoor', 'f', '4x200m', '4 X 200 m', 'U18 U23 U20 U18', '1''46"24', 106.24, '[{"lastName":"HAYEN","firstName":"Marthe"},{"lastName":"KIEFFER","firstName":"Tammy"},{"lastName":"HAYEN","firstName":"Chantal"},{"lastName":"SCHARTZ","firstName":"Kim"}]'::jsonb, 2005, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U20-50m-0')::uuid, 'U20', 'indoor', 'f', '50m', '50 m', 'U18', '6"59', 6.59, '[{"lastName":"GAENG","firstName":"Camille"}]'::jsonb, 2025, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U20-60m-1')::uuid, 'U20', 'indoor', 'f', '60m', '60 m', 'U20', '7"58', 7.58, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2015, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U20-200m-2')::uuid, 'U20', 'indoor', 'f', '200m', '200 m', 'U18', '24"74', 24.74, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2014, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U20-300m-3')::uuid, 'U20', 'indoor', 'f', '300m', '300 m', 'U20', '40"70', 40.7, '[{"lastName":"ZENS","firstName":"Annouk"}]'::jsonb, 2015, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U20-400m-4')::uuid, 'U20', 'indoor', 'f', '400m', '400 m', 'U20', '56"54', 56.54, '[{"lastName":"ZENS","firstName":"Anouk"}]'::jsonb, 2016, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U20-600m-5')::uuid, 'U20', 'indoor', 'f', '600m', '600 m', 'U18', '1''34"38', 94.38, '[{"lastName":"CICCONE","firstName":"Julia"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U20-800m-6')::uuid, 'U20', 'indoor', 'f', '800m', '800 m', 'U20', '2''13"32', 133.32, '[{"lastName":"HOFFMANN","firstName":"Vera"}]'::jsonb, 2015, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U20-1000m-7')::uuid, 'U20', 'indoor', 'f', '1000m', '1 000 m', 'U20', '2''57"83', 177.83, '[{"lastName":"HOFFMANN","firstName":"Vera"}]'::jsonb, 2014, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U20-1500m-8')::uuid, 'U20', 'indoor', 'f', '1500m', '1 500 m', 'U20', '4''32"94', 272.94, '[{"lastName":"HOFFMANN","firstName":"Vera"}]'::jsonb, 2015, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U20-3000m-9')::uuid, 'U20', 'indoor', 'f', '3000m', '3 000 m', 'U20', '10''37"70', 637.7, '[{"lastName":"MELLINA","firstName":"Martine"}]'::jsonb, 2008, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U20-60m-h-10')::uuid, 'U20', 'indoor', 'f', '60m-h', '60 m h.', 'U20', '8"49', 8.49, '[{"lastName":"GRANGER","firstName":"Uyana"}]'::jsonb, 2026, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U20-longueur-11')::uuid, 'U20', 'indoor', 'f', 'longueur', 'Weitsprong', 'U20', '5,95 m', 5.95, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2014, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U20-hauteur-12')::uuid, 'U20', 'indoor', 'f', 'hauteur', 'Héichsprong', 'U18', '1,69 m', 1.69, '[{"lastName":"ZIMMER","firstName":"Cathy"}]'::jsonb, 2014, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U20-triple-13')::uuid, 'U20', 'indoor', 'f', 'triple', 'Dreisprong', 'U20', '10,96 m', 10.96, '[{"lastName":"ZENS","firstName":"Cathy"}]'::jsonb, 2012, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U20-perche-14')::uuid, 'U20', 'indoor', 'f', 'perche', 'Perche', 'U18', '3,24 m', 3.24, '[{"lastName":"SCHMIT","firstName":"Cathy"}]'::jsonb, 2013, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U20-poids-4kg-15')::uuid, 'U20', 'indoor', 'f', 'poids-4kg', 'Poids 4 Kg', 'U20', '13,56 m', 13.56, '[{"lastName":"SCHARTZ","firstName":"Kim"}]'::jsonb, 2007, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U20-4x200m-16')::uuid, 'U20', 'indoor', 'f', '4x200m', '4 X 200 m', 'U18 U18 U18 U23', '1''49"97', 109.97, '[{"lastName":"GRANGER","firstName":"Uyana"},{"lastName":"SIMON","firstName":"Nanda"},{"lastName":"BRANDENBURGER","firstName":"Pia"},{"lastName":"ANGELSBERG","firstName":"Lara"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U18-50m-0')::uuid, 'U18', 'indoor', 'f', '50m', '50 m', 'U18', '6"59', 6.59, '[{"lastName":"GAENG","firstName":"Camille"}]'::jsonb, 2025, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U18-60m-1')::uuid, 'U18', 'indoor', 'f', '60m', '60 m', 'U18', '7"65', 7.65, '[{"lastName":"GAENG","firstName":"Camille"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U18-150m-2')::uuid, 'U18', 'indoor', 'f', '150m', '150 m', 'U18', '18"40', 18.4, '[{"lastName":"GAENG","firstName":"Camille"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U18-200m-3')::uuid, 'U18', 'indoor', 'f', '200m', '200 m', 'U18', '25"05', 25.05, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2012, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U18-300m-4')::uuid, 'U18', 'indoor', 'f', '300m', '300 m', 'U18', '41"62', 41.62, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2011, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U18-400m-5')::uuid, 'U18', 'indoor', 'f', '400m', '400 m', 'U18', '57"39', 57.39, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2013, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U18-600m-6')::uuid, 'U18', 'indoor', 'f', '600m', '600 m', 'U18', '1''34"38', 94.38, '[{"lastName":"CICCONE","firstName":"Julia"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U18-800m-7')::uuid, 'U18', 'indoor', 'f', '800m', '800 m', 'U18', '2''15"37', 135.37, '[{"lastName":"GLOESENER","firstName":"Jil"}]'::jsonb, 2008, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U18-1000m-8')::uuid, 'U18', 'indoor', 'f', '1000m', '1 000 m', 'U18', '3''04"46', 184.46, '[{"lastName":"SCHARTZ","firstName":"Joanne"}]'::jsonb, 2009, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U18-1500m-9')::uuid, 'U18', 'indoor', 'f', '1500m', '1 500 m', 'U18', '4''43"89', 283.89, '[{"lastName":"SCHARTZ","firstName":"Joanne"}]'::jsonb, 2010, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U18-60m-h-10')::uuid, 'U18', 'indoor', 'f', '60m-h', '60 m h.', 'U18', '8"81', 8.81, '[{"lastName":"GRANGER","firstName":"Uyana"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U18-longueur-11')::uuid, 'U18', 'indoor', 'f', 'longueur', 'Weitsprong', 'U18', '5,59 m', 5.59, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2013, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U18-hauteur-12')::uuid, 'U18', 'indoor', 'f', 'hauteur', 'Héichsprong', 'U18', '1,69 m', 1.69, '[{"lastName":"ZIMMER","firstName":"Cathy"}]'::jsonb, 2014, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U18-triple-13')::uuid, 'U18', 'indoor', 'f', 'triple', 'Dreisprong', 'U18', '10,48 m', 10.48, '[{"lastName":"VAESSEN","firstName":"Mathilda"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U18-perche-14')::uuid, 'U18', 'indoor', 'f', 'perche', 'Perche', 'U18', '3,24 m', 3.24, '[{"lastName":"SCHMIT","firstName":"Cathy"}]'::jsonb, 2013, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U18-poids-4kg-15')::uuid, 'U18', 'indoor', 'f', 'poids-4kg', 'Poids 4 Kg', 'U18', '13,04 m', 13.04, '[{"lastName":"SCHARTZ","firstName":"Kim"}]'::jsonb, 2005, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U18-poids-16')::uuid, 'U18', 'indoor', 'f', 'poids', 'Poids 3 Kg', 'U18', '13,71 m', 13.71, '[{"lastName":"SCHARTZ","firstName":"Kim"}]'::jsonb, 2005, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U18-pentathlon-17')::uuid, 'U18', 'indoor', 'f', 'pentathlon', 'Penthatlon Cad', 'U16', '2 718 P', 2718, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2010, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U18-4x200m-18')::uuid, 'U18', 'indoor', 'f', '4x200m', '4 X 200 m', NULL, '1''50"14', 110.14, '[{"lastName":"SCHMIT","firstName":"Cathy"},{"lastName":"ZIMMER","firstName":"Cathy"},{"lastName":"MICHEL","firstName":"Véronique"},{"lastName":"REISER","firstName":"Anne"}]'::jsonb, 2012, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U16-50m-0')::uuid, 'U16', 'indoor', 'f', '50m', '50 m', 'U16', '7"22', 7.22, '[{"lastName":"REDING","firstName":"Alexandra"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U16-60m-1')::uuid, 'U16', 'indoor', 'f', '60m', '60 m', 'U16', '7"67', 7.67, '[{"lastName":"GAENG","firstName":"Camille"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U16-150m-2')::uuid, 'U16', 'indoor', 'f', '150m', '150 m', 'U16', '20"16', 20.16, '[{"lastName":"JÜCH","firstName":"Nea"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U16-200m-3')::uuid, 'U16', 'indoor', 'f', '200m', '200 m', 'U16', '26"32', 26.32, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2011, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U16-300m-4')::uuid, 'U16', 'indoor', 'f', '300m', '300 m', 'U16', '42"32', 42.32, '[{"lastName":"ZIMMER","firstName":"Cathie"}]'::jsonb, 2012, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U16-400m-5')::uuid, 'U16', 'indoor', 'f', '400m', '400 m', 'U16', '63"37', 63.37, '[{"lastName":"REISER","firstName":"Anne"}]'::jsonb, 2012, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U16-600m-6')::uuid, 'U16', 'indoor', 'f', '600m', '600 m', 'U16', '1''41"38', 101.38, '[{"lastName":"GLODEN","firstName":"Jenny"}]'::jsonb, 2008, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U16-800m-7')::uuid, 'U16', 'indoor', 'f', '800m', '800 m', 'U16', '2''19"63', 139.63, '[{"lastName":"GLOESENER","firstName":"Jil"}]'::jsonb, 2007, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U16-1000m-8')::uuid, 'U16', 'indoor', 'f', '1000m', '1 000 m', 'U16', '3''06"31', 186.31, '[{"lastName":"SACKETT","firstName":"Verity"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U16-1500m-9')::uuid, 'U16', 'indoor', 'f', '1500m', '1 500 m', 'U16', '4''55"11', 295.11, '[{"lastName":"SCHARTZ","firstName":"Joanne"}]'::jsonb, 2008, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U16-2000m-10')::uuid, 'U16', 'indoor', 'f', '2000m', '2 000 m', 'U16', '6''59"47', 419.47, '[{"lastName":"SACKETT","firstName":"Verity"}]'::jsonb, 2025, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U16-3000m-11')::uuid, 'U16', 'indoor', 'f', '3000m', '3 000 m', 'U16', '10''54"83', 654.83, '[{"lastName":"SACKETT","firstName":"Verity"}]'::jsonb, 2025, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U16-50m-h-12')::uuid, 'U16', 'indoor', 'f', '50m-h', '50 m h.', 'U16', '8"55', 8.55, '[{"lastName":"SIMON","firstName":"Nanda"}]'::jsonb, 2021, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U16-60m-h-13')::uuid, 'U16', 'indoor', 'f', '60m-h', '60 m h.', 'U16', '9"63', 9.63, '[{"lastName":"LUDWIG","firstName":"Marie"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U16-longueur-14')::uuid, 'U16', 'indoor', 'f', 'longueur', 'Weitsprong', 'U16', '5,34 m', 5.34, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2011, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U16-triple-15')::uuid, 'U16', 'indoor', 'f', 'triple', 'Dreisprong', 'U16', '9,66 m', 9.66, '[{"lastName":"MICHEL","firstName":"Véronique"}]'::jsonb, 2011, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U16-perche-16')::uuid, 'U16', 'indoor', 'f', 'perche', 'Perche', 'U16', '2,90 m', 2.9, '[{"lastName":"SCHMIT","firstName":"Cathy"}]'::jsonb, 2012, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U16-hauteur-17')::uuid, 'U16', 'indoor', 'f', 'hauteur', 'Héichsprong', 'U16', '1,62 m', 1.62, '[{"lastName":"ZIMMER","firstName":"Cathy"}]'::jsonb, 2013, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U16-poids-4kg-18')::uuid, 'U16', 'indoor', 'f', 'poids-4kg', 'Poids 4 Kg', 'U16', '8,59 m', 8.59, '[{"lastName":"MICHEL","firstName":"Véronique"}]'::jsonb, 2011, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U16-poids-19')::uuid, 'U16', 'indoor', 'f', 'poids', 'Poids 3 Kg', 'U16', '12,37 m', 12.37, '[{"lastName":"SCHARTZ","firstName":"Kim"}]'::jsonb, 2002, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U16-4x200m-20')::uuid, 'U16', 'indoor', 'f', '4x200m', '4 X 200 m', 'U16', '1''53"88', 113.88, '[{"lastName":"SCHMIT","firstName":"Cathy"},{"lastName":"REISER","firstName":"Anne"},{"lastName":"ZIMMER","firstName":"Cathy"},{"lastName":"ZENS","firstName":"Annouk"}]'::jsonb, 2012, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U14-50m-0')::uuid, 'U14', 'indoor', 'f', '50m', '50 m', 'U14', '7"67', 7.67, '[{"lastName":"STRASSER","firstName":"Louise"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U14-60m-1')::uuid, 'U14', 'indoor', 'f', '60m', '60 m', 'U14', '8"45', 8.45, '[{"lastName":"LEICK","firstName":"Sophie"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U14-75m-2')::uuid, 'U14', 'indoor', 'f', '75m', '75 m', 'U14', '10"20', 10.2, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2009, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U14-300m-3')::uuid, 'U14', 'indoor', 'f', '300m', '300 m', 'U14', '48"59', 48.59, '[{"lastName":"HAYEN","firstName":"Marthe"}]'::jsonb, 2002, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U14-600m-4')::uuid, 'U14', 'indoor', 'f', '600m', '600 m', 'U14', '1''51"94', 111.94, '[{"lastName":"GOERGEN","firstName":"Joanna"}]'::jsonb, 2008, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U14-800m-5')::uuid, 'U14', 'indoor', 'f', '800m', '800 m', 'U14', '2''31"09', 151.09, '[{"lastName":"VAESSEN","firstName":"Mathilda"}]'::jsonb, 2020, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U14-1000m-6')::uuid, 'U14', 'indoor', 'f', '1000m', '1 000 m', 'U14', '3''22"07', 202.07, '[{"lastName":"BAUM","firstName":"Shannon"}]'::jsonb, 2007, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U14-50m-h-7')::uuid, 'U14', 'indoor', 'f', '50m-h', '50 m H', 'U14', '9"27', 9.27, '[{"lastName":"STRASSER","firstName":"Louise"}]'::jsonb, 2022, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U14-60m-h-8')::uuid, 'U14', 'indoor', 'f', '60m-h', '60 m H', 'U14', '10"91', 10.91, '[{"lastName":"THULL","firstName":"Elena"}]'::jsonb, 2012, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U14-longueur-9')::uuid, 'U14', 'indoor', 'f', 'longueur', 'Longueur', 'U14', '4,94 m', 4.9399999999999995, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2009, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U14-hauteur-10')::uuid, 'U14', 'indoor', 'f', 'hauteur', 'Hauteur', 'U14', '1,50 m', 1.5, '[{"lastName":"COLLETTE","firstName":"Laura"},{"lastName":"LEICK","firstName":"Sophie"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U14-poids-11')::uuid, 'U14', 'indoor', 'f', 'poids', 'Poids', 'U14', '8,17 m', 8.17, '[{"lastName":"LEICK","firstName":"Sophie"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U14-4x200m-12')::uuid, 'U14', 'indoor', 'f', '4x200m', '4 X 200 m', 'U14', '2''01"37', 121.37, '[{"lastName":"HOFFMAN","firstName":"Vera"},{"lastName":"MICHEL","firstName":"Véronique"},{"lastName":"OCHS","firstName":"Julie"},{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2009, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U12-50m-0')::uuid, 'U12', 'indoor', 'f', '50m', '50 m', NULL, '7"82', 7.82, '[{"lastName":"BIRCHEN","firstName":"Catherine"}]'::jsonb, 2014, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U12-400m-1')::uuid, 'U12', 'indoor', 'f', '400m', '400 m', NULL, '1''49"09', 109.09, '[{"lastName":"GOERGEN","firstName":"Nora"}]'::jsonb, 2006, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U12-600m-2')::uuid, 'U12', 'indoor', 'f', '600m', '600 m', NULL, '1''59"13', 119.13, '[{"lastName":"OCHS","firstName":"Julie"}]'::jsonb, 2008, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U12-800m-3')::uuid, 'U12', 'indoor', 'f', '800m', '800 m', NULL, '2''48"61', 168.61, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2007, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U12-1000m-4')::uuid, 'U12', 'indoor', 'f', '1000m', '1 000 m', NULL, '3''37"07', 217.07, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2006, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U12-longueur-5')::uuid, 'U12', 'indoor', 'f', 'longueur', 'Longueur', NULL, '4,38 m', 4.38, '[{"lastName":"JONES","firstName":"Laurence"}]'::jsonb, 2007, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:f-indoor-U12-hauteur-6')::uuid, 'U12', 'indoor', 'f', 'hauteur', 'Hauteur', NULL, '1,35 m', 1.35, '[{"lastName":"RAMOS","firstName":"Iris"}]'::jsonb, 2015, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U23-100m-0')::uuid, 'U23', 'piste', 'm', '100m', '100 m', 'U20', '10"70', 10.7, '[{"lastName":"POLFER","firstName":"Josy"}]'::jsonb, 1973, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U23-300m-1')::uuid, 'U23', 'piste', 'm', '300m', '300 m', 'U18', '36"71', 36.71, '[{"lastName":"FISCHER","firstName":"Sven"}]'::jsonb, 2008, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U23-400m-2')::uuid, 'U23', 'piste', 'm', '400m', '400 m', 'U23', '48"81', 48.81, '[{"lastName":"FISCHER","firstName":"Sven"}]'::jsonb, 2011, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U23-500m-3')::uuid, 'U23', 'piste', 'm', '500m', '500 m', 'U23', '66"79', 66.79, '[{"lastName":"HERBER","firstName":"Eric"}]'::jsonb, 2012, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U23-600m-4')::uuid, 'U23', 'piste', 'm', '600m', '600 m', 'U20', '1''20"50', 80.5, '[{"lastName":"WIETOR","firstName":"Jean-Claude"}]'::jsonb, 1977, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U23-800m-5')::uuid, 'U23', 'piste', 'm', '800m', '800 m', 'U23', '1''49"12', 109.12, '[{"lastName":"QUERINJEAN","firstName":"Ruben"}]'::jsonb, 2022, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U23-1000m-6')::uuid, 'U23', 'piste', 'm', '1000m', '1 000 m', 'U23', '2''27"06', 147.06, '[{"lastName":"MELLINA","firstName":"Pol"}]'::jsonb, 2009, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U23-1500m-7')::uuid, 'U23', 'piste', 'm', '1500m', '1 500 m', 'U23', '3''39"02', 219.02, '[{"lastName":"QUERINJEAN","firstName":"Ruben"}]'::jsonb, 2022, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U23-1-mile-8')::uuid, 'U23', 'piste', 'm', '1-mile', '1 mile', 'U23', '4''17"78', 257.78, '[{"lastName":"ASSEL","firstName":"Claude"}]'::jsonb, 1989, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U23-2000m-9')::uuid, 'U23', 'piste', 'm', '2000m', '2 000 m', 'U23', '5''44"03', 344.03, '[{"lastName":"GIERENS","firstName":"Maurice"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U23-3000m-10')::uuid, 'U23', 'piste', 'm', '3000m', '3 000 m', 'U23', '7''53"60', 473.6, '[{"lastName":"QUERINJEAN","firstName":"Ruben"}]'::jsonb, 2022, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U23-5000m-11')::uuid, 'U23', 'piste', 'm', '5000m', '5 000 m', 'U23', '14''25"43', 865.43, '[{"lastName":"PETIT","firstName":"Jens"}]'::jsonb, 1982, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U23-10000m-12')::uuid, 'U23', 'piste', 'm', '10000m', '10 000 m', 'U23', '30''52"33', 1852.33, '[{"lastName":"WEICHERDING","firstName":"Gil"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U23-110m-h-13')::uuid, 'U23', 'piste', 'm', '110m-h', '110 m haies', 'U23', '17"46', 17.46, '[{"lastName":"HAYEN","firstName":"Jacques"}]'::jsonb, 2007, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U23-400m-h-14')::uuid, 'U23', 'piste', 'm', '400m-h', '400 m haies', 'U23', '58"00', 58, '[{"lastName":"POTT","firstName":"Georges"}]'::jsonb, 1978, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U23-2000m-st-15')::uuid, 'U23', 'piste', 'm', '2000m-st', '2 000 m St.', 'U23', '5''45"99', 345.99, '[{"lastName":"WEICHERDING","firstName":"Gil"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U23-3000m-st-16')::uuid, 'U23', 'piste', 'm', '3000m-st', '3 000 m St.', 'U23', '8''41"16', 521.16, '[{"lastName":"QUERINJEAN","firstName":"Ruben"}]'::jsonb, 2022, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U23-disque-17')::uuid, 'U23', 'piste', 'm', 'disque', 'Disque', 'U20', '34,33 m', 34.33, '[{"lastName":"MICHEL","firstName":"Benny"}]'::jsonb, 2019, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U23-javelot-18')::uuid, 'U23', 'piste', 'm', 'javelot', 'Javelot', 'U23', '59,98 m', 59.98, '[{"lastName":"GOEDERT","firstName":"Marc"}]'::jsonb, 1989, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U23-marteau-19')::uuid, 'U23', 'piste', 'm', 'marteau', 'Marteau', 'U20', '35,96 m', 35.96, '[{"lastName":"MICHEL","firstName":"Benny"}]'::jsonb, 2019, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U23-poids-20')::uuid, 'U23', 'piste', 'm', 'poids', 'Poids', 'U23', '12,77 m', 12.77, '[{"lastName":"MICHEL","firstName":"Benny"}]'::jsonb, 2022, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U23-hauteur-21')::uuid, 'U23', 'piste', 'm', 'hauteur', 'Hauteur', 'U18', '2,03 m', 2.03, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U23-longueur-22')::uuid, 'U23', 'piste', 'm', 'longueur', 'Longueur', 'U20', '6,51 m', 6.51, '[{"lastName":"REUTER","firstName":"Fernand"}]'::jsonb, 1972, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U23-perche-23')::uuid, 'U23', 'piste', 'm', 'perche', 'Perche', 'U20', '4,20 m', 4.2, '[{"lastName":"MICHEL","firstName":"Roy"}]'::jsonb, 2012, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U23-triple-24')::uuid, 'U23', 'piste', 'm', 'triple', 'Triple-Saut', 'U23', '13,06 m', 13.06, '[{"lastName":"FLESCH","firstName":"Hucky"}]'::jsonb, 1972, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U23-decathlon-25')::uuid, 'U23', 'piste', 'm', 'decathlon', 'Décathlon', 'U23', '4 542 P', 4542, '[{"lastName":"MICHEL","firstName":"Roy"}]'::jsonb, 2013, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-100m-0')::uuid, 'U20', 'piste', 'm', '100m', '100 m', 'U20', '10"70', 10.7, '[{"lastName":"POLFER","firstName":"Josy"}]'::jsonb, 1973, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-150m-1')::uuid, 'U20', 'piste', 'm', '150m', '150 m', 'U20', '17"30', 17.3, '[{"lastName":"VAN DEN HEUVEL","firstName":"Antoine"}]'::jsonb, 2008, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-200m-2')::uuid, 'U20', 'piste', 'm', '200m', '200 m', 'U20', '22"88', 22.88, '[{"lastName":"SCHEER","firstName":"Sebastian"}]'::jsonb, 2000, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-300m-3')::uuid, 'U20', 'piste', 'm', '300m', '300 m', 'U20', '36"71', 36.71, '[{"lastName":"FISCHER","firstName":"Sven"}]'::jsonb, 2008, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-400m-4')::uuid, 'U20', 'piste', 'm', '400m', '400 m', 'U20', '49"38', 49.38, '[{"lastName":"FISCHER","firstName":"Sven"}]'::jsonb, 2010, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-500m-5')::uuid, 'U20', 'piste', 'm', '500m', '500 m', 'U18', '67"30', 67.3, '[{"lastName":"BRUZZESE","firstName":"Pascal"}]'::jsonb, 1983, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-600m-6')::uuid, 'U20', 'piste', 'm', '600m', '600 m', 'U20', '1''20"50', 80.5, '[{"lastName":"WIETOR","firstName":"Jean-Claude"}]'::jsonb, 1977, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-800m-7')::uuid, 'U20', 'piste', 'm', '800m', '800 m', 'U20', '1''52"32', 112.32, '[{"lastName":"REILAND","firstName":"Fabrice"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-1000m-8')::uuid, 'U20', 'piste', 'm', '1000m', '1 000 m', 'U20', '2''27"78', 147.78, '[{"lastName":"RECHT","firstName":"Tom"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-1500m-9')::uuid, 'U20', 'piste', 'm', '1500m', '1 500 m', 'U20', '3''52"11', 232.11, '[{"lastName":"RECHT","firstName":"Tom"}]'::jsonb, 2022, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-1-mile-10')::uuid, 'U20', 'piste', 'm', '1-mile', 'Mile', 'U20', '4''29"31', 269.31, '[{"lastName":"RECHT","firstName":"Tom"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-2000m-11')::uuid, 'U20', 'piste', 'm', '2000m', '2 000 m', 'U20', '5''37"40', 337.4, '[{"lastName":"WEICHERDING","firstName":"Gil"}]'::jsonb, 2020, false, true)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-3000m-12')::uuid, 'U20', 'piste', 'm', '3000m', '3 000 m', 'U20', '8''26"59', 506.59, '[{"lastName":"QUERINJEAN","firstName":"Ruben"}]'::jsonb, 2020, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-5000m-13')::uuid, 'U20', 'piste', 'm', '5000m', '5 000 m', 'U20', '14''59"69', 899.69, '[{"lastName":"MELLINA","firstName":"Pol"}]'::jsonb, 2007, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-110m-h-14')::uuid, 'U20', 'piste', 'm', '110m-h', '110 m h.', 'U20', '14"13', 14.13, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2026, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-3000m-st-15')::uuid, 'U20', 'piste', 'm', '3000m-st', '3 000 m St.', 'U20', '9''18"66', 558.66, '[{"lastName":"PECHON","firstName":"Damien"}]'::jsonb, 2026, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-longueur-16')::uuid, 'U20', 'piste', 'm', 'longueur', 'Weitsprong', 'U20', '6,51 m', 6.51, '[{"lastName":"REUTER","firstName":"Fernand"}]'::jsonb, 1972, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-hauteur-17')::uuid, 'U20', 'piste', 'm', 'hauteur', 'Héichsprong', 'U18', '2,03 m', 2.03, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-triple-18')::uuid, 'U20', 'piste', 'm', 'triple', 'Dreisprong', 'U20', '12,82 m', 12.82, '[{"lastName":"FLESCH","firstName":"Gaston"}]'::jsonb, 1970, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-perche-19')::uuid, 'U20', 'piste', 'm', 'perche', 'Perche', 'U20', '4,20 m', 4.2, '[{"lastName":"MICHEL","firstName":"Roy"}]'::jsonb, 2012, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-javelot-20')::uuid, 'U20', 'piste', 'm', 'javelot', 'Javelot', 'U20', '57,82 m', 57.82, '[{"lastName":"THILL","firstName":"Luc"}]'::jsonb, 1993, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-disque-21')::uuid, 'U20', 'piste', 'm', 'disque', 'Diskus', 'U20', '36,34 m', 36.34, '[{"lastName":"MICHEL","firstName":"Benny"}]'::jsonb, 2019, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-poids-22')::uuid, 'U20', 'piste', 'm', 'poids', 'Poids 6 Kg', 'U20', '13,95 m', 13.95, '[{"lastName":"MICHEL","firstName":"Benny"}]'::jsonb, 2019, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-marteau-23')::uuid, 'U20', 'piste', 'm', 'marteau', 'Marteau 6 Kg', 'U20', '40,63 m', 40.63, '[{"lastName":"MICHEL","firstName":"Benny"}]'::jsonb, 2019, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-decathlon-24')::uuid, 'U20', 'piste', 'm', 'decathlon', 'Décathlon', 'U20', '5 029 P', 5029, '[{"lastName":"HAYEN","firstName":"Jacques"}]'::jsonb, 2005, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U18-60m-0')::uuid, 'U18', 'piste', 'm', '60m', '60 m', 'U18', '7"40', 7.4, '[{"lastName":"SCHEER","firstName":"Sebastian"}]'::jsonb, 1999, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U18-100m-1')::uuid, 'U18', 'piste', 'm', '100m', '100 m', 'U18', '11"26', 11.26, '[{"lastName":"ARCARO","firstName":"Noa"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U18-200m-2')::uuid, 'U18', 'piste', 'm', '200m', '200 m', 'U18', '22"96', 22.96, '[{"lastName":"ARCARO","firstName":"Noa"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U18-300m-3')::uuid, 'U18', 'piste', 'm', '300m', '300 m', 'U18', '37"65', 37.65, '[{"lastName":"REILAND","firstName":"Fabrice"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U18-400m-4')::uuid, 'U18', 'piste', 'm', '400m', '400 m', 'U18', '50"07', 50.07, '[{"lastName":"ARCARO","firstName":"Noa"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U18-600m-5')::uuid, 'U18', 'piste', 'm', '600m', '600 m', 'U18', '1''21"52', 81.52, '[{"lastName":"REILAND","firstName":"Fabrice"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U18-800m-6')::uuid, 'U18', 'piste', 'm', '800m', '800 m', 'U18', '1''54"07', 114.07, '[{"lastName":"REILAND","firstName":"Fabrice"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U18-1000m-7')::uuid, 'U18', 'piste', 'm', '1000m', '1 000 m', 'U18', '2''32"62', 152.62, '[{"lastName":"PECHON","firstName":"Damien"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U18-1500m-8')::uuid, 'U18', 'piste', 'm', '1500m', '1 500 m', 'U18', '3''57"69', 237.69, '[{"lastName":"PECHON","firstName":"Damien"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U18-2000m-9')::uuid, 'U18', 'piste', 'm', '2000m', '2 000 m', 'U18', '5''44"72', 344.72, '[{"lastName":"PECHON","firstName":"Damine"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U18-3000m-10')::uuid, 'U18', 'piste', 'm', '3000m', '3 000 m', 'U18', '8''36"60', 516.6, '[{"lastName":"PECHON","firstName":"Damien"}]'::jsonb, 2025, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U18-2000m-st-11')::uuid, 'U18', 'piste', 'm', '2000m-st', '2 000 m St', 'U18', '5''58"27', 358.27, '[{"lastName":"PECHON","firstName":"Damien"}]'::jsonb, 2025, true, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U18-60m-h-12')::uuid, 'U18', 'piste', 'm', '60m-h', '60 m Hecken', 'U18', '9"55', 9.55, '[{"lastName":"KOMPANETS","firstName":"Nikita"}]'::jsonb, 2010, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U18-110m-h-13')::uuid, 'U18', 'piste', 'm', '110m-h', '110 m Hecken', 'U18', '14"34', 14.34, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U18-longueur-14')::uuid, 'U18', 'piste', 'm', 'longueur', 'Weitsprong', 'U18', '6,41 m', 6.41, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U18-hauteur-15')::uuid, 'U18', 'piste', 'm', 'hauteur', 'Héichsprong', 'U18', '2,03 m', 2.03, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U18-perche-16')::uuid, 'U18', 'piste', 'm', 'perche', 'Perche', 'U18', '4,00 m', 4, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U18-poids-17')::uuid, 'U18', 'piste', 'm', 'poids', 'Bomstoussen 5Kg', 'U18', '13,49 m', 13.49, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U18-javelot-18')::uuid, 'U18', 'piste', 'm', 'javelot', 'Speer 700g', 'U18', '48,56 m', 48.56, '[{"lastName":"GREGOR","firstName":"Niklas"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U18-disque-19')::uuid, 'U18', 'piste', 'm', 'disque', 'Diskus 1,5kg', 'U18', '36,30 m', 36.3, '[{"lastName":"MICHEL","firstName":"Benny"}]'::jsonb, 2017, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U18-marteau-20')::uuid, 'U18', 'piste', 'm', 'marteau', 'Hummer 6Kg', 'U18', '32,23 m', 32.23, '[{"lastName":"MICHEL","firstName":"Benny"}]'::jsonb, 2018, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U18-heptathlon-21')::uuid, 'U18', 'piste', 'm', 'heptathlon', 'Hepthatlon', 'U18', '6 404 P', 6404, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-75m-0')::uuid, 'U16', 'piste', 'm', '75m', '75 m', NULL, '9"54', 9.54, '[{"lastName":"JÜCH","firstName":"Mats"}]'::jsonb, 2021, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-100m-1')::uuid, 'U16', 'piste', 'm', '100m', '100 m', NULL, '11"30', 11.3, '[{"lastName":"POLFER","firstName":"Josy"}]'::jsonb, 1970, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-200m-2')::uuid, 'U16', 'piste', 'm', '200m', '200 m', NULL, '24"37', 24.37, '[{"lastName":"ARCARO","firstName":"Noa"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-300m-3')::uuid, 'U16', 'piste', 'm', '300m', '300 m', NULL, '38"20', 38.2, '[{"lastName":"SCHOLTES","firstName":"Dan"}]'::jsonb, 1984, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-400m-4')::uuid, 'U16', 'piste', 'm', '400m', '400 m', NULL, '53"92', 53.92, '[{"lastName":"ARCARO","firstName":"Noa"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-500m-5')::uuid, 'U16', 'piste', 'm', '500m', '500 m', NULL, '1''22"50', 82.5, '[{"lastName":"KOWALYSZYN","firstName":"Sacha"}]'::jsonb, 1987, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-600m-6')::uuid, 'U16', 'piste', 'm', '600m', '600 m', NULL, '1''27"89', 87.89, '[{"lastName":"TEIXEIRA","firstName":"Jory"}]'::jsonb, 2020, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-800m-7')::uuid, 'U16', 'piste', 'm', '800m', '800 m', NULL, '2''01"38', 121.38, '[{"lastName":"BERTEMES","firstName":"Bob"}]'::jsonb, 2009, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-1000m-8')::uuid, 'U16', 'piste', 'm', '1000m', '1 000 m', NULL, '2''40"86', 160.86, '[{"lastName":"PECHON","firstName":"Damien"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-1500m-9')::uuid, 'U16', 'piste', 'm', '1500m', '1 500 m', NULL, '4''15"49', 255.49, '[{"lastName":"PECHON","firstName":"Damien"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-1-mile-10')::uuid, 'U16', 'piste', 'm', '1-mile', 'Mile', NULL, '4''39"53', 279.53, '[{"lastName":"PECHON","firstName":"Damien"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-2000m-11')::uuid, 'U16', 'piste', 'm', '2000m', '2 000 m', NULL, '5''57"06', 357.06, '[{"lastName":"PECHON","firstName":"Damien"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-3000m-12')::uuid, 'U16', 'piste', 'm', '3000m', '3 000 m', NULL, '9''37"49', 577.49, '[{"lastName":"PECHON","firstName":"Damien"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-80m-h-13')::uuid, 'U16', 'piste', 'm', '80m-h', '80 m haies', NULL, '12"48', 12.48, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2022, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-100m-h-14')::uuid, 'U16', 'piste', 'm', '100m-h', '100 m haies', NULL, '14"13', 14.13, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-300m-h-15')::uuid, 'U16', 'piste', 'm', '300m-h', '300 m haies', NULL, '42"44', 42.44, '[{"lastName":"ARCARO","firstName":"Noa"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-2000m-st-16')::uuid, 'U16', 'piste', 'm', '2000m-st', '2000 m steeple', NULL, '6''17"59', 377.59, '[{"lastName":"PECHON","firstName":"Damien"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-disque-17')::uuid, 'U16', 'piste', 'm', 'disque', 'Disque 1 Kg', NULL, '38,49 m', 38.49, '[{"lastName":"MICHEL","firstName":"Benny"}]'::jsonb, 2015, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-javelot-18')::uuid, 'U16', 'piste', 'm', 'javelot', '600 Gr Javelot', NULL, '45,88 m', 45.88, '[{"lastName":"GREGOR","firstName":"Niklas"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-marteau-19')::uuid, 'U16', 'piste', 'm', 'marteau', 'Marteau 4 Kg', NULL, '27,17 m', 27.17, '[{"lastName":"MICHEL","firstName":"Benny"}]'::jsonb, 2015, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-poids-20')::uuid, 'U16', 'piste', 'm', 'poids', 'Poids', NULL, '12,02 m', 12.02, '[{"lastName":"GREGOR","firstName":"Niklas"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-hauteur-21')::uuid, 'U16', 'piste', 'm', 'hauteur', 'Hauteur', NULL, '1,82 m', 1.8199999999999998, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-longueur-22')::uuid, 'U16', 'piste', 'm', 'longueur', 'Longueur', NULL, '5,72 m', 5.72, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-perche-23')::uuid, 'U16', 'piste', 'm', 'perche', 'Perche', NULL, '3,90 m', 3.9, '[{"lastName":"LEITAO","firstName":"Hugo"},{"lastName":"PERREIRA","firstName":"Victor"}]'::jsonb, 2014, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-triple-24')::uuid, 'U16', 'piste', 'm', 'triple', 'Triple-Saut', NULL, '10,83 m', 10.83, '[{"lastName":"MOLITOR","firstName":"Christian"}]'::jsonb, 2003, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-decathlon-25')::uuid, 'U16', 'piste', 'm', 'decathlon', 'Décathlon', NULL, '2 427 P', 2427, '[{"lastName":"MICHEL","firstName":"Roy"}]'::jsonb, 2008, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-octathlon-26')::uuid, 'U16', 'piste', 'm', 'octathlon', 'Achtkampf', NULL, '5 060 P', 5060, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U14-50m-0')::uuid, 'U14', 'piste', 'm', '50m', '50 m', 'U14', '7"01', 7.01, '[{"lastName":"MOLITOR","firstName":"Christian"}]'::jsonb, 2001, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U14-75m-1')::uuid, 'U14', 'piste', 'm', '75m', '75 m', 'U14', '9"37', 9.37, '[{"lastName":"PIERLOT","firstName":"Lenn"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U14-80m-2')::uuid, 'U14', 'piste', 'm', '80m', '80 m', 'U14', '10"96', 10.96, '[{"lastName":"JOLY","firstName":"Til"}]'::jsonb, 2021, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U14-150m-3')::uuid, 'U14', 'piste', 'm', '150m', '150 m', 'U14', '21"00', 21, '[{"lastName":"REILAND","firstName":"Fabrice"}]'::jsonb, 2019, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U14-200m-4')::uuid, 'U14', 'piste', 'm', '200m', '200 m', 'U14', '26"20', 26.2, '[{"lastName":"KOWALYSZYN","firstName":"Sacha"}]'::jsonb, 1987, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U14-500m-5')::uuid, 'U14', 'piste', 'm', '500m', '500 m', 'U14', '1''22"50', 82.5, '[{"lastName":"KOWALYSZYN","firstName":"Sacha"}]'::jsonb, 1987, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U14-600m-6')::uuid, 'U14', 'piste', 'm', '600m', '600 m', 'U14', '1''41"39', 101.39, '[{"lastName":"PETIT","firstName":"Pol"}]'::jsonb, 2006, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U14-800m-7')::uuid, 'U14', 'piste', 'm', '800m', '800 m', 'U14', '2''20"53', 140.53, '[{"lastName":"REILAND","firstName":"Fabrice"}]'::jsonb, 2019, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U14-1000m-8')::uuid, 'U14', 'piste', 'm', '1000m', '1 000 m', 'U14', '2''53"63', 173.63, '[{"lastName":"MOLITOR","firstName":"Christian"}]'::jsonb, 2001, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U14-2000m-9')::uuid, 'U14', 'piste', 'm', '2000m', '2 000 m', 'U14', '6''38"92', 398.92, '[{"lastName":"PETIT","firstName":"Pol"}]'::jsonb, 2005, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U14-60m-h-10')::uuid, 'U14', 'piste', 'm', '60m-h', '60 m h', 'U14 U14', '9"83', 9.83, '[{"lastName":"LONGO","firstName":"Ilan"},{"lastName":"SCHOEBEN","firstName":"Guillaume"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U14-hauteur-11')::uuid, 'U14', 'piste', 'm', 'hauteur', 'Hauteur', 'U14', '1,53 m', 1.53, '[{"lastName":"DA COSTA PINTO","firstName":"Levi"}]'::jsonb, 2026, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U14-longueur-12')::uuid, 'U14', 'piste', 'm', 'longueur', 'Longueur', 'U14', '5,27 m', 5.27, '[{"lastName":"JOLY","firstName":"Til"}]'::jsonb, 2021, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U14-ball-13')::uuid, 'U14', 'piste', 'm', 'ball', 'Ball 200 Gr', 'U14', '48,00 m', 48, '[{"lastName":"MICHEL","firstName":"Roy"}]'::jsonb, 2006, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U14-javelot-14')::uuid, 'U14', 'piste', 'm', 'javelot', 'Javelot 400 Gr', 'U14', '34,69 m', 34.69, '[{"lastName":"GREGOR","firstName":"Niklas"}]'::jsonb, 2021, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U14-disque-15')::uuid, 'U14', 'piste', 'm', 'disque', 'Disque 750 Gr', 'U14', '30,26 m', 30.26, '[{"lastName":"MICHEL","firstName":"Benny"}]'::jsonb, 2013, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U14-poids-16')::uuid, 'U14', 'piste', 'm', 'poids', 'Poids 2 Kg', 'U14', '10,89 m', 10.89, '[{"lastName":"MOLITOR","firstName":"Christian"}]'::jsonb, 2001, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U14-poids-17')::uuid, 'U14', 'piste', 'm', 'poids', 'Poids 3 Kg', 'U14', '9,47 m', 9.47, '[{"lastName":"JOLY","firstName":"Til"}]'::jsonb, 2021, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U14-marteau-18')::uuid, 'U14', 'piste', 'm', 'marteau', 'Marteau 3Kg', 'U14', '21,64 m', 21.64, '[{"lastName":"MICHEL","firstName":"Benny"}]'::jsonb, 2013, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U14-4x50m-19')::uuid, 'U14', 'piste', 'm', '4x50m', '4 X 50 m', 'U14', '27"33', 27.33, '[{"lastName":"SCHOEBEN","firstName":"Guillaume"},{"lastName":"LISBOA","firstName":"Mylo"},{"lastName":"PIERLOT","firstName":"Lenn"},{"lastName":"POËZEVARA-COUQUE","firstName":"Mathis"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U14-4x75m-20')::uuid, 'U14', 'piste', 'm', '4x75m', '4 X 75 m', 'U14', '45"76', 45.76, '[{"lastName":"KOHL","firstName":"Yannick"},{"lastName":"JONES","firstName":"Chris"},{"lastName":"STEFFEN","firstName":"Kevin"},{"lastName":"GLODEN","firstName":"Jeff"}]'::jsonb, 2006, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U14-3x800m-21')::uuid, 'U14', 'piste', 'm', '3x800m', '3 x 800 m', 'U14', '7''35"02', 455.02, '[{"lastName":"PECHON","firstName":"Damien"},{"lastName":"ARCARO","firstName":"Noa"},{"lastName":"LEY","firstName":"Jamie"}]'::jsonb, 2020, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U14-3x1000m-22')::uuid, 'U14', 'piste', 'm', '3x1000m', '3 X 1 000 m', 'U14', '9''44"50', 584.5, '[{"lastName":"LUDWIG","firstName":"Jannick"},{"lastName":"BERTEMES","firstName":"Louis"},{"lastName":"LISBOA","firstName":"Mylo"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U12-50m-0')::uuid, 'U12', 'piste', 'm', '50m', '50 m', 'U12', '7"10', 7.1, '[{"lastName":"LONGO","firstName":"Ilan"}]'::jsonb, 2020, false, true)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U12-75m-1')::uuid, 'U12', 'piste', 'm', '75m', '75 m', 'U12', '11"11', 11.11, '[{"lastName":"RODEN","firstName":"Wayne"}]'::jsonb, 2018, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U12-600m-2')::uuid, 'U12', 'piste', 'm', '600m', '600 m', 'U12', '1''41"39', 101.39, '[{"lastName":"PETIT","firstName":"Pol"}]'::jsonb, 2006, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U12-800m-3')::uuid, 'U12', 'piste', 'm', '800m', '800 m', 'U12', '2''31"08', 151.08, '[{"lastName":"RODEN","firstName":"Wayne"}]'::jsonb, 2018, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U12-1000m-4')::uuid, 'U12', 'piste', 'm', '1000m', '1 000 m', 'U12', '3''13"13', 193.13, '[{"lastName":"PETIT","firstName":"Pol"}]'::jsonb, 2004, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U12-2000m-5')::uuid, 'U12', 'piste', 'm', '2000m', '2 000 m', 'U12', '7''07"10', 427.1, '[{"lastName":"HERBER","firstName":"Eric"}]'::jsonb, 2002, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U12-60m-h-6')::uuid, 'U12', 'piste', 'm', '60m-h', '60 m h', 'U12', '13"26', 13.26, '[{"lastName":"THULL","firstName":"Kevin"}]'::jsonb, 2010, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U12-longueur-7')::uuid, 'U12', 'piste', 'm', 'longueur', 'Longueur', 'U12', '4,51 m', 4.51, '[{"lastName":"LEY","firstName":"Jamie"}]'::jsonb, 2018, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U12-hauteur-8')::uuid, 'U12', 'piste', 'm', 'hauteur', 'Hauteur', 'U12', '1,35 m', 1.35, '[{"lastName":"GODWIN","firstName":"Zion"}]'::jsonb, 2019, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U12-ball-9')::uuid, 'U12', 'piste', 'm', 'ball', 'Ball 80 Gr', 'U12', '49,00 m', 49, '[{"lastName":"KOMPANETS","firstName":"Nikita"}]'::jsonb, 2005, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U12-4x50m-10')::uuid, 'U12', 'piste', 'm', '4x50m', '4 X 50 m', 'U12', '30"80', 30.8, '[{"lastName":"DA COSTA ALBERS LISBOA BERNASCONI","firstName":"Levi Venant Neo Eden"}]'::jsonb, 2024, false, true)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U12-3x800m-11')::uuid, 'U12', 'piste', 'm', '3x800m', '3 x 800 m', 'U12', '8''20"73', 500.73, '[{"lastName":"JOLY","firstName":"Till"},{"lastName":"LIIGA","firstName":"Fabrice"},{"lastName":"PECHON","firstName":"Damien"}]'::jsonb, 2019, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U12-3x1000m-12')::uuid, 'U12', 'piste', 'm', '3x1000m', '3 X 1 000 m', 'U12', '10''36"48', 636.48, '[{"lastName":"DA COSTA LISBOA BERNASCONI","firstName":"Levi Neo Eden"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-4x100m-0')::uuid, 'U20', 'piste', 'm', '4x100m', '4 X 100 m', 'U20', '47"73', 47.73, '[{"lastName":"SAUBER CERON V. D. HEUVEL RICHARD","firstName":"Tom José Antoine Dustin"}]'::jsonb, 2005, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U18-4x100m-1')::uuid, 'U18', 'piste', 'm', '4x100m', '4 X 100 m', 'U18', '47"73', 47.73, '[{"lastName":"SAUBER CERON V. D. HEUVEL RICHARD","firstName":"Tom José Antoine Dustin"}]'::jsonb, 2005, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-4x100m-2')::uuid, 'U16', 'piste', 'm', '4x100m', '4 X 100 m', 'U16', '48"82', 48.82, '[{"lastName":"PECHON","firstName":"Damien"},{"lastName":"JOLY","firstName":"Till"},{"lastName":"GREGOR","firstName":"Niklas"},{"lastName":"ARCARO","firstName":"Noa"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U18-4x200m-3')::uuid, 'U18', 'piste', 'm', '4x200m', '4 X 200 m', 'U18', '1''42"90', 102.9, '[{"lastName":"SCHMIT","firstName":"Jean-Paul"},{"lastName":"GAERTNER","firstName":"Pierre"},{"lastName":"FUSENIG","firstName":"Romain"},{"lastName":"FELLER","firstName":"Michel"}]'::jsonb, 1983, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-4x200m-4')::uuid, 'U20', 'piste', 'm', '4x200m', '4 X 200 m', 'U20 U20 U20 U18', '1''38"38', 98.38, '[{"lastName":"STEFFEN","firstName":"Kevin"},{"lastName":"LOUIS","firstName":"Jan"},{"lastName":"JONES","firstName":"Chrisl"},{"lastName":"KOHL","firstName":"Yannick"}]'::jsonb, 2011, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U23-4x400m-5')::uuid, 'U23', 'piste', 'm', '4x400m', '4X400 m', 'U20 U18 U23 U20', '3''24"86', 204.86, '[{"lastName":"SCHLAMMES","firstName":"Ben"},{"lastName":"REILAND","firstName":"Fabrice"},{"lastName":"HEUTS","firstName":"Sam"},{"lastName":"RECHT","firstName":"Tom"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-4x400m-6')::uuid, 'U20', 'piste', 'm', '4x400m', '4 X 400 m', 'U20', '3''38"05', 218.05, '[{"lastName":"SCHLAMMES","firstName":"Ben"},{"lastName":"GIERENS","firstName":"Maurice"},{"lastName":"TEIXEIRA","firstName":"Jory"},{"lastName":"HEUTS","firstName":"Sam"}]'::jsonb, 2021, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U18-4x400m-7')::uuid, 'U18', 'piste', 'm', '4x400m', '4 X 400 m', 'U18', '3''40"81', 220.81, '[{"lastName":"THILL","firstName":"Patrick"},{"lastName":"HERBER","firstName":"Eric"},{"lastName":"CZERWINSKI","firstName":"Michel"},{"lastName":"FISCHER","firstName":"Sven"}]'::jsonb, 2007, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-4x400m-8')::uuid, 'U16', 'piste', 'm', '4x400m', '4 X 400 m', 'U16', '3''59"10', 239.1, '[{"lastName":"HAAGEN","firstName":"Luc"},{"lastName":"HAAGEN","firstName":"Serge"},{"lastName":"HAAGEN","firstName":"René"},{"lastName":"GREGORIUS","firstName":"Claude"}]'::jsonb, 1983, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U23-3x1000m-9')::uuid, 'U23', 'piste', 'm', '3x1000m', '3 X 1 000 m', 'U20', '7''50"62', 470.62, '[{"lastName":"SCHMIT","firstName":"Nicolas"},{"lastName":"BERTEMES","firstName":"Ben"},{"lastName":"FISCHER","firstName":"Sven"}]'::jsonb, 2010, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U20-3x1000m-10')::uuid, 'U20', 'piste', 'm', '3x1000m', '3 X 1 000 m', 'U20', '7''50"62', 470.62, '[{"lastName":"SCHMIT","firstName":"Nicolas"},{"lastName":"BERTEMES","firstName":"Ben"},{"lastName":"FISCHER","firstName":"Nicolas"}]'::jsonb, 2010, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U18-3x1000m-11')::uuid, 'U18', 'piste', 'm', '3x1000m', '3 X 1 000 m', 'U18', '8''10"30', 490.3, '[{"lastName":"SCHLAMMES","firstName":"Ben"},{"lastName":"REILAND","firstName":"Fabrice"},{"lastName":"TEIXEIRA","firstName":"Jory"}]'::jsonb, 2021, false, true)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-piste-U16-3x1000m-12')::uuid, 'U16', 'piste', 'm', '3x1000m', '3 X 1 000 m', 'U16', '8''40"47', 520.47, '[{"lastName":"LISBOA","firstName":"Mylo"},{"lastName":"KOTECKY","firstName":"Jachym"},{"lastName":"LUDWIG","firstName":"Jannick"}]'::jsonb, 2026, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U23-60m-0')::uuid, 'U23', 'indoor', 'm', '60m', '60 m', 'U20', '7"19', 7.19, '[{"lastName":"ROSA","firstName":"Steve"}]'::jsonb, 2005, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U23-200m-1')::uuid, 'U23', 'indoor', 'm', '200m', '200 m', 'U20', '22"73', 22.73, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2026, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U23-300m-2')::uuid, 'U23', 'indoor', 'm', '300m', '300 m', 'U23', '35"38', 35.38, '[{"lastName":"FISCHER","firstName":"Sven"}]'::jsonb, 2011, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U23-400m-3')::uuid, 'U23', 'indoor', 'm', '400m', '400 m', 'U23', '49"63', 49.63, '[{"lastName":"FISCHER","firstName":"Sven"}]'::jsonb, 2011, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U23-600m-4')::uuid, 'U23', 'indoor', 'm', '600m', '600 m', 'U23', '1''21"93', 81.93, '[{"lastName":"RECHT","firstName":"Tom"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U23-800m-5')::uuid, 'U23', 'indoor', 'm', '800m', '800 m', 'U23', '1''51"37', 111.37, '[{"lastName":"RECHT","firstName":"Tom"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U23-1000m-6')::uuid, 'U23', 'indoor', 'm', '1000m', '1 000 m', 'U23', '2''28"24', 148.24, '[{"lastName":"RECHT","firstName":"Tom"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U23-1500m-7')::uuid, 'U23', 'indoor', 'm', '1500m', '1 500 m', 'U23', '3''56"01', 236.01, '[{"lastName":"MELLINA","firstName":"Pol"}]'::jsonb, 2010, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U23-3000m-8')::uuid, 'U23', 'indoor', 'm', '3000m', '3 000 m', 'U23', '8''28"89', 508.89, '[{"lastName":"MELLINA","firstName":"Pol"}]'::jsonb, 2010, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U23-5000m-9')::uuid, 'U23', 'indoor', 'm', '5000m', '5 000 m', 'U23', '14''54"16', 894.16, '[{"lastName":"WEICHERDING","firstName":"Gil"}]'::jsonb, 2022, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U23-longueur-10')::uuid, 'U23', 'indoor', 'm', 'longueur', 'Weitsprong', 'U18', '6,71 m', 6.71, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U23-hauteur-11')::uuid, 'U23', 'indoor', 'm', 'hauteur', 'Héichsprong', 'U18', '1,96 m', 1.96, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U23-triple-12')::uuid, 'U23', 'indoor', 'm', 'triple', 'Dreisprong', 'U20', '11,15 m', 11.15, '[{"lastName":"MICHEL","firstName":"Roy"}]'::jsonb, 2011, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U23-perche-13')::uuid, 'U23', 'indoor', 'm', 'perche', 'Perche', 'U20', '4,50 m', 4.5, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2026, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U23-poids-14')::uuid, 'U23', 'indoor', 'm', 'poids', 'Poids', 'U23', '12,51 m', 12.51, '[{"lastName":"MICHEL","firstName":"Benny"}]'::jsonb, 2022, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U23-heptathlon-15')::uuid, 'U23', 'indoor', 'm', 'heptathlon', 'Heptathlon', 'U18', '5 093 P', 5093, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U23-4x200m-16')::uuid, 'U23', 'indoor', 'm', '4x200m', '4 X 200 m', 'U18 U20 U23 U20', '1''35"51', 95.51, '[{"lastName":"RIVNY","firstName":"Genrikh"},{"lastName":"STEFFEN","firstName":"Kevin"},{"lastName":"HERBER","firstName":"Eric"},{"lastName":"KOHL","firstName":"Yannick"}]'::jsonb, 2012, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U20-60m-0')::uuid, 'U20', 'indoor', 'm', '60m', '60 m', 'U20', '7"19', 7.19, '[{"lastName":"ROSA","firstName":"Steve"}]'::jsonb, 2005, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U20-200m-1')::uuid, 'U20', 'indoor', 'm', '200m', '200 m', 'U20', '22"73', 22.73, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2026, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U20-300m-2')::uuid, 'U20', 'indoor', 'm', '300m', '300 m', 'U20', '37"02', 37.02, '[{"lastName":"FISCHER","firstName":"Sven"}]'::jsonb, 2009, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U20-400m-3')::uuid, 'U20', 'indoor', 'm', '400m', '400 m', 'U20', '50"53', 50.53, '[{"lastName":"FISCHER","firstName":"Sven"}]'::jsonb, 2009, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U20-600m-4')::uuid, 'U20', 'indoor', 'm', '600m', '600 m', 'U20', '1''22"79', 82.79, '[{"lastName":"REILAND","firstName":"Fabrice"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U20-800m-5')::uuid, 'U20', 'indoor', 'm', '800m', '800 m', 'U20', '1''54"07', 114.07, '[{"lastName":"FISCHER","firstName":"Sven"}]'::jsonb, 2010, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U20-1000m-6')::uuid, 'U20', 'indoor', 'm', '1000m', '1 000 m', 'U20', '2''31"56', 151.56, '[{"lastName":"BERTEMES","firstName":"Ben"}]'::jsonb, 2009, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U20-3000m-7')::uuid, 'U20', 'indoor', 'm', '3000m', '3 000 m', 'U20', '8''34"41', 514.41, '[{"lastName":"WEICHERDING","firstName":"Gil"}]'::jsonb, 2020, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U20-60m-h-8')::uuid, 'U20', 'indoor', 'm', '60m-h', '60 m h.', 'U20', '8"20', 8.2, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2026, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U20-longueur-9')::uuid, 'U20', 'indoor', 'm', 'longueur', 'Weitsprong', 'U18', '6,71 m', 6.71, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U20-hauteur-10')::uuid, 'U20', 'indoor', 'm', 'hauteur', 'Héichsprong', 'U18', '1,96 m', 1.96, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U20-triple-11')::uuid, 'U20', 'indoor', 'm', 'triple', 'Dreisprong', 'U20', '11,15 m', 11.15, '[{"lastName":"MICHEL","firstName":"Roy"}]'::jsonb, 2011, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U20-perche-12')::uuid, 'U20', 'indoor', 'm', 'perche', 'Perche', 'U20', '4,50 m', 4.5, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2026, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U20-poids-13')::uuid, 'U20', 'indoor', 'm', 'poids', 'Poids 6 Kg', 'U20', '12,71 m', 12.71, '[{"lastName":"MICHEL","firstName":"Benny"}]'::jsonb, 2019, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U20-heptathlon-14')::uuid, 'U20', 'indoor', 'm', 'heptathlon', 'Heptathlon', 'U20', '5 252 P', 5252, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2026, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U20-4x200m-15')::uuid, 'U20', 'indoor', 'm', '4x200m', '4 X 200 m', 'U20 U20 U20 U18', '1''38"38', 98.38, '[{"lastName":"STEFFEN","firstName":"Kevin"},{"lastName":"LOUIS","firstName":"Jan"},{"lastName":"JONES","firstName":"Chrisl"},{"lastName":"KOHL","firstName":"Yannick"}]'::jsonb, 2011, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U18-60m-0')::uuid, 'U18', 'indoor', 'm', '60m', '60 m', 'U18', '7"16', 7.16, '[{"lastName":"ARCARO","firstName":"Noa"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U18-200m-1')::uuid, 'U18', 'indoor', 'm', '200m', '200 m', 'U18', '22"82', 22.82, '[{"lastName":"ARCARO","firstName":"Noa"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U18-150m-2')::uuid, 'U18', 'indoor', 'm', '150m', '150 m', 'U18', '17"15', 17.15, '[{"lastName":"ARCARO","firstName":"Noa"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U18-300m-3')::uuid, 'U18', 'indoor', 'm', '300m', '300 m', 'U16', '36"06', 36.06, '[{"lastName":"ARCARO","firstName":"Noa"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U18-400m-4')::uuid, 'U18', 'indoor', 'm', '400m', '400 m', 'U18', '51"44', 51.44, '[{"lastName":"ARCARO","firstName":"Noa"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U18-600m-5')::uuid, 'U18', 'indoor', 'm', '600m', '600 m', 'U18', '1''23"86', 83.86, '[{"lastName":"REILAND","firstName":"Fabrice"}]'::jsonb, 2022, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U18-800m-6')::uuid, 'U18', 'indoor', 'm', '800m', '800 m', 'U18', '1''56"94', 116.94, '[{"lastName":"BERTEMES","firstName":"Bob"}]'::jsonb, 2011, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U18-1000m-7')::uuid, 'U18', 'indoor', 'm', '1000m', '1 000 m', 'U18', '2''35"39', 155.39, '[{"lastName":"PECHON","firstName":"Damien"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U18-1500m-8')::uuid, 'U18', 'indoor', 'm', '1500m', '1 500 m', 'U18', '4''01"46', 241.46, '[{"lastName":"PECHON","firstName":"Damien"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U18-2000m-9')::uuid, 'U18', 'indoor', 'm', '2000m', '2 000 m', 'U16', '5''53"86', 353.86, '[{"lastName":"PECHON","firstName":"Damien"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U18-3000m-10')::uuid, 'U18', 'indoor', 'm', '3000m', '3 000 m', 'U18', '8''55"34', 535.34, '[{"lastName":"PECHON","firstName":"Damien"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U18-60m-h-11')::uuid, 'U18', 'indoor', 'm', '60m-h', '60 m Hecken', 'U18', '8"29', 8.29, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U18-longueur-12')::uuid, 'U18', 'indoor', 'm', 'longueur', 'Weitsprong', 'U18', '6,71 m', 6.71, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U18-hauteur-13')::uuid, 'U18', 'indoor', 'm', 'hauteur', 'Héichsprong', 'U18', '1,96 m', 1.96, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U18-perche-14')::uuid, 'U18', 'indoor', 'm', 'perche', 'Perche', 'U18', '4,47 m', 4.47, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U18-poids-15')::uuid, 'U18', 'indoor', 'm', 'poids', 'Bomstoussen 5Kg', 'U18', '13,50 m', 13.5, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U18-heptathlon-16')::uuid, 'U18', 'indoor', 'm', 'heptathlon', 'Hepthatlon', 'U18', '5 093 P', 5093, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U18-4x200m-17')::uuid, 'U18', 'indoor', 'm', '4x200m', '4 x 200 m', 'U16 U16 U18 U16', '1''40"54', 100.54, '[{"lastName":"LISBOA","firstName":"Mylo"},{"lastName":"LUDWIG","firstName":"Jannick"},{"lastName":"CHABOUD-VELLE","firstName":"Marek"},{"lastName":"PIERLOT","firstName":"Lenn"}]'::jsonb, 2026, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U16-50m-0')::uuid, 'U16', 'indoor', 'm', '50m', '50 m', 'U16', '6"79', 6.79, '[{"lastName":"JÜCH","firstName":"Mats"}]'::jsonb, 2021, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U16-60m-1')::uuid, 'U16', 'indoor', 'm', '60m', '60 m', 'U16', '7"26', 7.26, '[{"lastName":"ARCARO","firstName":"Noa"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U16-150m-2')::uuid, 'U16', 'indoor', 'm', '150m', '150 m', 'U16', '17"57', 17.57, '[{"lastName":"ARCARO","firstName":"Noa"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U16-200m-3')::uuid, 'U16', 'indoor', 'm', '200m', '200 m', 'U16', '23"74', 23.74, '[{"lastName":"PIERLOT","firstName":"Lenn"}]'::jsonb, 2026, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U16-300m-4')::uuid, 'U16', 'indoor', 'm', '300m', '300 m', 'U16', '36"78', 36.78, '[{"lastName":"ARCARO","firstName":"Noa"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U16-400m-5')::uuid, 'U16', 'indoor', 'm', '400m', '400 m', 'U16', '52"44', 52.44, '[{"lastName":"ARCARO","firstName":"Noa"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U16-600m-6')::uuid, 'U16', 'indoor', 'm', '600m', '600 m', 'U16', '1''30"26', 90.26, '[{"lastName":"THILL","firstName":"Patrick"}]'::jsonb, 2005, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U16-800m-7')::uuid, 'U16', 'indoor', 'm', '800m', '800 m', 'U16', '2''07"55', 127.55, '[{"lastName":"BERTEMES","firstName":"Bob"}]'::jsonb, 2009, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U16-1000m-8')::uuid, 'U16', 'indoor', 'm', '1000m', '1 000 m', 'U16', '2''41"14', 161.14, '[{"lastName":"PECHON","firstName":"Damien"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U16-1500m-9')::uuid, 'U16', 'indoor', 'm', '1500m', '1 500 m', 'U16', '4''19"12', 259.12, '[{"lastName":"TEIXEIRA","firstName":"Jory"}]'::jsonb, 2020, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U16-2000m-10')::uuid, 'U16', 'indoor', 'm', '2000m', '2 000 m', 'U16', '5''53"86', 353.86, '[{"lastName":"PECHON","firstName":"Damien"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U16-60m-h-11')::uuid, 'U16', 'indoor', 'm', '60m-h', '60 m Hecken', 'U16', '8"73', 8.73, '[{"lastName":"SCHOEBEN","firstName":"Guillaume"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U16-longueur-12')::uuid, 'U16', 'indoor', 'm', 'longueur', 'Weitsprong', 'U16', '6,13 m', 6.13, '[{"lastName":"PIERLOT","firstName":"Lenn"}]'::jsonb, 2026, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U16-triple-13')::uuid, 'U16', 'indoor', 'm', 'triple', 'Dräisprong', 'U16', '10,85 m', 10.85, '[{"lastName":"BERTEMES","firstName":"Louis"}]'::jsonb, 2026, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U16-hauteur-14')::uuid, 'U16', 'indoor', 'm', 'hauteur', 'Héichsprong', 'U16', '1,86 m', 1.8599999999999999, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U16-perche-15')::uuid, 'U16', 'indoor', 'm', 'perche', 'Perche', 'U16', '3,25 m', 3.25, '[{"lastName":"JOLY","firstName":"Till"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U16-poids-16')::uuid, 'U16', 'indoor', 'm', 'poids', 'Bomstoussen', 'U16', '11,82 m', 11.82, '[{"lastName":"SCHOEBEN","firstName":"Guillaume"}]'::jsonb, 2025, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U14-50m-0')::uuid, 'U14', 'indoor', 'm', '50m', '50 m', 'U14', '7"59', 7.59, '[{"lastName":"ARCARO","firstName":"Noa"}]'::jsonb, 2021, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U14-60m-1')::uuid, 'U14', 'indoor', 'm', '60m', '60 m', 'U14', '7"82', 7.82, '[{"lastName":"PIERLOT","firstName":"Lenn"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U14-600m-2')::uuid, 'U14', 'indoor', 'm', '600m', '600 m', 'U14', '1''46"54', 106.54, '[{"lastName":"SCHMIT","firstName":"Nicolas"}]'::jsonb, 2005, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U14-800m-3')::uuid, 'U14', 'indoor', 'm', '800m', '800 m', 'U14', '2''22"41', 142.41, '[{"lastName":"PETIT","firstName":"Pol"}]'::jsonb, 2005, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U14-1000m-4')::uuid, 'U14', 'indoor', 'm', '1000m', '1 000 m', 'U14', '3''05"81', 185.81, '[{"lastName":"LISBOA","firstName":"Neo"}]'::jsonb, 2026, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U14-60m-h-5')::uuid, 'U14', 'indoor', 'm', '60m-h', '60 m Hecken', 'U14', '9"86', 9.86, '[{"lastName":"PIERLOT","firstName":"Lenn"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U14-hauteur-6')::uuid, 'U14', 'indoor', 'm', 'hauteur', 'Hauteur', 'U14', '1,60 m', 1.6, '[{"lastName":"SCHOEBEN","firstName":"Guillaume"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U14-longueur-7')::uuid, 'U14', 'indoor', 'm', 'longueur', 'Longueur', 'U14', '5,16 m', 5.16, '[{"lastName":"SCHOEBEN","firstName":"Guillaume"}]'::jsonb, 2023, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U14-poids-8')::uuid, 'U14', 'indoor', 'm', 'poids', 'Poids', 'U14', '9,84 m', 9.84, '[{"lastName":"PIERLOT","firstName":"Lenn"}]'::jsonb, 2024, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U12-50m-0')::uuid, 'U12', 'indoor', 'm', '50m', '50 m', NULL, '7"56', 7.5600000000000005, '[{"lastName":"RODEN","firstName":"Wayne"}]'::jsonb, 2018, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U12-600m-1')::uuid, 'U12', 'indoor', 'm', '600m', '600 m', NULL, '1''49"28', 109.28, '[{"lastName":"PETIT","firstName":"Pol"}]'::jsonb, 2004, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U12-800m-2')::uuid, 'U12', 'indoor', 'm', '800m', '800 m', NULL, '2''36"87', 156.87, '[{"lastName":"PETIT","firstName":"Pol"}]'::jsonb, 2004, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U12-1000m-3')::uuid, 'U12', 'indoor', 'm', '1000m', '1 000 m', NULL, '3''20"63', 200.63, '[{"lastName":"KRAEMER","firstName":"Luca"}]'::jsonb, 2012, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U12-hauteur-4')::uuid, 'U12', 'indoor', 'm', 'hauteur', 'Hauteur', NULL, '1,45 m', 1.45, '[{"lastName":"GODWIN","firstName":"Zion"}]'::jsonb, 2019, false, false)
on conflict (id) do nothing;
insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5('bp:m-indoor-U12-longueur-5')::uuid, 'U12', 'indoor', 'm', 'longueur', 'Longueur', NULL, '4,30 m', 4.3, '[{"lastName":"GODWIN","firstName":"Zion"}]'::jsonb, 2019, false, false)
on conflict (id) do nothing;

insert into public.coaches (id, first_name, last_name, section, sort_order) values
  (md5('coach:Bob:BERTEMES')::uuid, 'Bob', 'BERTEMES', 'athletics', 0),
  (md5('coach:Jo:BRANDENBURGER')::uuid, 'Jo', 'BRANDENBURGER', 'athletics', 10),
  (md5('coach:Mirko:GREGOR')::uuid, 'Mirko', 'GREGOR', 'athletics', 20),
  (md5('coach:Elisabeth:HOFFMANN')::uuid, 'Elisabeth', 'HOFFMANN', 'athletics', 30),
  (md5('coach:Aline:KIESCH')::uuid, 'Aline', 'KIESCH', 'athletics', 40),
  (md5('coach:Stefan:KORNELIS')::uuid, 'Stefan', 'KORNELIS', 'athletics', 50),
  (md5('coach:Mieke:KOSTER')::uuid, 'Mieke', 'KOSTER', 'athletics', 60),
  (md5('coach:Olivier:LESSIRE')::uuid, 'Olivier', 'LESSIRE', 'athletics', 70),
  (md5('coach:Romain:POSSING')::uuid, 'Romain', 'POSSING', 'athletics', 80),
  (md5('coach:Josée:SCHAEFER')::uuid, 'Josée', 'SCHAEFER', 'athletics', 90),
  (md5('coach:Anne:SIEBENALER')::uuid, 'Anne', 'SIEBENALER', 'athletics', 100),
  (md5('coach:Sebastiaan:VAN DEN HEUVEL')::uuid, 'Sebastiaan', 'VAN DEN HEUVEL', 'athletics', 110),
  (md5('coach:Jang:WINANDY')::uuid, 'Jang', 'WINANDY', 'athletics', 120),
  (md5('coach:Kenny-Neal:WOLMERING')::uuid, 'Kenny-Neal', 'WOLMERING', 'athletics', 130),
  (md5('coach:Steve:FELLER')::uuid, 'Steve', 'FELLER', 'triathlon', 140),
  (md5('coach:Tom:HEMMEN')::uuid, 'Tom', 'HEMMEN', 'triathlon', 150),
  (md5('coach:Max:SCHROEDER')::uuid, 'Max', 'SCHROEDER', 'triathlon', 160),
  (md5('coach:Jean-Marc:WAGNER')::uuid, 'Jean-Marc', 'WAGNER', 'triathlon', 170)
on conflict (id) do nothing;

insert into public.committee (id, name, role_key, sort_order) values
  (md5('committee:funck')::uuid, 'Marc FUNCK', 'president', 10),
  (md5('committee:weis')::uuid, 'Joel WEIS', 'vicePresident', 20),
  (md5('committee:reiser-m')::uuid, 'Monique REISER', 'secretary', 30),
  (md5('committee:hoffmann-e')::uuid, 'Elisabeth HOFFMANN', 'secretaryDeputy', 40),
  (md5('committee:juchemes')::uuid, 'Annie JUCHEMES', 'treasurer', 50),
  (md5('committee:scheller')::uuid, 'Luc SCHELLER', 'treasurer', 60),
  (md5('committee:angelsberg-s')::uuid, 'Steve ANGELSBERG', 'member', 70),
  (md5('committee:mathay')::uuid, 'Jeff MATHAY', 'member', 80),
  (md5('committee:reiser-a')::uuid, 'Anne REISER', 'member', 90),
  (md5('committee:sauber')::uuid, 'Aline SAUBER', 'member', 100),
  (md5('committee:useldinger')::uuid, 'Michel USELDINGER', 'member', 110),
  (md5('committee:weis-coord')::uuid, 'Joel WEIS', 'sportsCoordinator', 120),
  (md5('committee:reiser-lic')::uuid, 'Monique REISER', 'licences', 130),
  (md5('committee:angelsberg-l')::uuid, 'Lara ANGELSBERG', 'athleteRep', 140),
  (md5('committee:ley')::uuid, 'Jamie LEY', 'athleteRep', 150)
on conflict (id) do nothing;

insert into public.sponsors (id, name, logo_url, website_url, tier, sort_order, jersey_position) values
  (md5('sponsor:asport')::uuid, 'Asport', '/sponsors/asport.webp', 'https://www.asport.lu', 'haaptsponsor', 10, '{"x":50,"y":42}'::jsonb),
  (md5('sponsor:zens')::uuid, 'Zens sàrl', '/sponsors/zens.webp', 'https://www.porteszens.lu', 'partner', 20, '{"x":40,"y":56}'::jsonb),
  (md5('sponsor:pepin')::uuid, 'Garage Pepin', '/sponsors/pepin.webp', 'https://www.pepin.lu', 'partner', 30, '{"x":60,"y":56}'::jsonb),
  (md5('sponsor:voyages-schmit')::uuid, 'Voyages Schmit', '/sponsors/schmit.webp', 'https://www.voyages-schmit.lu', 'partner', 40, '{"x":40,"y":66}'::jsonb),
  (md5('sponsor:lalux')::uuid, 'LALUX', '/sponsors/lalux.webp', 'https://www.lalux.lu', 'partner', 50, '{"x":60,"y":66}'::jsonb),
  (md5('sponsor:peters-sports')::uuid, 'Peters Sports', NULL, NULL, 'supporter', 60, '{"x":50,"y":76}'::jsonb),
  (md5('sponsor:s-cape')::uuid, 'S-Cape', NULL, NULL, 'supporter', 70, '{"x":38,"y":30}'::jsonb),
  (md5('sponsor:reiff-mazout')::uuid, 'Reiff Mazout S.A.', NULL, NULL, 'supporter', 80, '{"x":62,"y":30}'::jsonb)
on conflict (id) do nothing;

-- Termine des Vereins (von der alten Seite).
insert into public.events (id, slug, title, body, starts_at, ends_at, location)
values (md5('event:waemper-2026')::uuid, 'waemper-triathlon-lof-2026', '{"lb":"Wämper Triathlon + Wämper Lof"}'::jsonb, '{"lb":"Den 22. an 23. August zu Weiswampech."}'::jsonb, '2026-08-22', '2026-08-23', 'Weiswampach')
on conflict (id) do nothing;

-- Langtexte. body traegt die Bloecke je Sprache; lb ist gefuellt, de und
-- fr folgen, sobald der Verein uebersetzt (§11: stiller Rueckfall).
insert into public.pages (id, slug, title, body)
values (md5('page:club')::uuid, 'club', '{"lb":"Allgemeng Informatiounen fir nei Memberen"}'::jsonb, '{"lb":[{"type":"heading","text":"Allgemeng Informatiounen fir nei Memberen"},{"type":"paragraph","text":"D’Liichtathletik as d’Olympesch Sportaart Nr. 1. Si bidd jiddwerengem déi Epreuve déi him passt. Sprint, wäit lafen, sprangen oder werfen. Fir jiddereen as eppes derbäi."},{"type":"paragraph","text":"Mir am CELTIC fannen et wichteg dass ee Freed derbäi huet. An dat as och dat éischt, wat mir wëlle vermëttelen: Freed un der Liichtathletik mat hire ville Méiglechkeeten."},{"type":"paragraph","text":"Net jiddereen kënnt an de CELTIC mat deem selwechten Zil. Et mëcht ee Sport fir gesond ze bleiwen, fir sech mat aneren ze vergläichen, well et Spaass mëcht, awer och well een éiergäizeg ass an ee wëll Champion gin. Liichtathletik ass objektiv. Do as keen Arbitter mat Tomaten op den Aen oder deen eppes géint een huet. De Chrono an d’Zentimeterband ieren sech nët. D’Plaz am Klassement huet een sech éierlech verdingt."},{"type":"paragraph","text":"Eng Liichtathletikcarrière ass e Laangzäitprojet. Et gëtt een net vun haut op mar Weltmeeschter. Meeschtens net."},{"type":"paragraph","text":"D’CELTIC Trainer Team huet d’Missioun fir all d’Athleten optimal ze betreien a Fonctioun vun hirem Kënnen an hiren Ambitiounen. D’Trainingsphilosophie vum CELTIC fousst op engem kontinuéierlechen Opbau, Schrëtt fir Schrëtt, ouni Etappen z’iwwersprangen, bei deem Technik, Souplesse, Vitesse a Koordinatioun d’Basis sin fir d’Entwécklung zum selbststännegen a selbstbewossten Athlet."},{"type":"paragraph","text":"Op dëse Säiten fannt dir e puer Informatiounen iwwert de Club, den Training an d’Competitiounen."},{"type":"paragraph","text":"Vill Freed beim Liesen."}]}'::jsonb)
on conflict (id) do nothing;
insert into public.pages (id, slug, title, body)
values (md5('page:club/training')::uuid, 'club/training', '{"lb":"CELTIC Liichtathletikschoul"}'::jsonb, '{"lb":[{"type":"paragraph","text":"Et gin am Celtic verschidden Trainingsgruppen"},{"type":"list","items":["CELTIC Liichtathletikschoul","CELTIC Créateur d’athlètes","CELTIC Powerhouse of athletics","CELTIC Liichtathletik fir Jiddereen"]},{"type":"paragraph","text":"D’Andeelung an déi verschidden Gruppen ass prinzipiell ofhängeg vum Alter vun de Sportler. Mir kucken och op hir Entwecklung. D’Iwwergäng tëschent de Gruppen sin fléissend no Ofsprooch vum Coordinateur sportif mat den Traineren an dem Athlet. Fir flott Joeren an der Liichtathletik ze verbrengen, muss een net onbedengt all des Trainingsgruppen duerchlaf hun. Quereinsteiger gin an d’Gruppen integréiert."},{"type":"heading","text":"CELTIC Liichtathletikschoul"},{"type":"paragraph","text":"Fir Kanner vun 5 Joer un bis 11 Joer, d.h. aus den Kategorien Ludiques (U8), Benjamins (U10) an Débutants (U12)"},{"type":"paragraph","text":"Déi jonck Sportler kréien eng adaptéiert Préparatioun fir all Sportarten an Disziplinnen déi am Celtic praktizéiert gin: Liichtathletik, Triathlon, Duathlon. D’Übungen, d’Geräter an d’Spiller sin hirem Alter ugepasst. Si léieren esou d’Grondbegrëffer vun de verschiddenen Haaptdisziplinnen d.h. Sprint, Laf, Sprong, Worf."},{"type":"paragraph","text":"Dat wichtegst awer as Freed a Spaass zesummen mat de Celtic Kollegen"},{"type":"paragraph","text":"Trainer : Aline Kiesch U10 Josée Schäfer U10 - Elisabeth Hoffmann U12 - Mieke Koster U12 - Anne Siebenaler U12 - Jang Winandy U12"},{"type":"heading","text":"CELTIC Créateur d’athlètes"},{"type":"paragraph","text":"Fir Kanner teschend 12 Joer a 14 Joer, d.h. aus den Kategorien Scolaires (U14) a Minimes (U16)."},{"type":"paragraph","text":"D’Zil ass zesummen mam Athlet seng Disziplin ze fannen an hien dohin z’orientéieren. D’Minimes maachen hir éischt Erfahrungen bei Meeschterschaften. All Joer kommen do CELTIC Athleten op de Podium, mee dat ass net dat Wichtegst. Eng Liichtathletikcarrière ass ee Laangzäitprojet an deemno gëtt Schrëtt fir Schrëtt, ouni Etappen z‘iwwersprangen, den Athlet zu senger Epreuve higefouert fir no a no de perfekten Geste ze léieren."},{"type":"paragraph","text":"Trainer : Sebastiaan Van den Heuvel, Kenny-Neal Wolmering, Stefan Kornelis, Romain Possing"},{"type":"heading","text":"CELTIC Powerhouse of athletics"},{"type":"paragraph","text":"Vun der Kategorie Cadets bis un d’Enn vun der Carrière. Hei gëtt op déi Joeren virdrunn opgebaut, mam Zil der idealer Kombinatioun vun Esthetik an Efficacitéit esou no wéi méiglech ze kommen."},{"type":"paragraph","text":"Trainer : Stefan Kornelis, Jo Brandenburger, Mirko Gregor, Kenny-Neal Wolmering, Oliier Lessire, Bob Bertemes"},{"type":"heading","text":"CELTIC Liichtathletik fir Jiddereen"},{"type":"paragraph","text":"Jiddereen, gëtt op Wonsch an no Méiglechkeet vum CELTIC Trainerteam beroden."},{"type":"heading","text":"TRAININGSPLAZEN"},{"type":"paragraph","text":"Plan"},{"type":"list","items":["Centre Sportif, rue Jos Merten, Diekirch.","Sportshal Lycée Classique Diekirch, Neit Gebei.","Sportshal Primaireschoul, Place de l’Ecole"]},{"type":"heading","text":"TRAININGSZAÏTEN"},{"type":"paragraph","text":"Sportshal Primaire Schoul (3) Centre Sportif (1)"},{"type":"paragraph","text":"Mir maachen keng Vakanz. Den Training fällt just aus wann een offiziellen Feierdag ass an deemno d’Hal zou ass. Dat gët annoncéiert."},{"type":"heading","text":"STAGEN"},{"type":"paragraph","text":"De CELTIC organiséiert zwee Stagen : De Stage fir Athleten vun der Kategorie Minimes un an der Ouschtervakanz zu Palafrugell an La Fosca op der Costa Brava (ESP). De Stage fir Débutants a Scolaires ass meeschtens an der Päischtvakanz."}]}'::jsonb)
on conflict (id) do nothing;
insert into public.pages (id, slug, title, body)
values (md5('page:club/trainer')::uuid, 'club/trainer', '{"lb":"Liichtathletik"}'::jsonb, '{"lb":[{"type":"heading","text":"Liichtathletik"},{"type":"heading","text":"Bob BERTEMES"},{"type":"paragraph","text":"Brevet \"LUXQF3\""},{"type":"heading","text":"Jo BRANDENBURGER"},{"type":"paragraph","text":"Mëttel a Langstréckeleefer beim Celtic vun 1982-1989. Duathlet an den 90er Joeren mat 3 Partizipatiounen op de Duathlonweltmeeschterschaften zu Zofingen(CH). Weiderhi selwer aktiv als Langstréckeleefer. Brevet \"LUXQF5\" (A-Schäin)"},{"type":"heading","text":"Mirko GREGOR"},{"type":"paragraph","text":"Mittelstreckler, Mehrkämpfer, mehrfacher Rheinland-Jugendmeister und Teilnahme an Deutschen Jugendmeisterschaften (Mehrkampf, Weitsprung), Auswahlathlet des Landesverbandes Rheinland. Heute aktiv als Läufer. Brevet \"LUXQF3\" (C-Schäin)"},{"type":"heading","text":"Elisabeth HOFFMANN"},{"type":"paragraph","text":"Vu Kand un Sportbegeeschtert, bis zum Studium Leeschtungssportlerin, ugefangen mat Turnen, iwert Basket an Tennis bis zur Liichtathletik, zenter 2001 erëm als Laangstreckeleeferin aktiv (10km, Semi an Marathon). Brevet \"LUXQF3\" (C-Schäin)"},{"type":"heading","text":"Aline KIESCH"},{"type":"paragraph","text":"Turnmonitrice, Brevet \"LUXQF3\" (C-Schäin)"},{"type":"heading","text":"Stefan KORNELIS"},{"type":"paragraph","text":"Am Celtic zënter 1992, verschidden Titelen an de Jugendkategorien (Mëttelstrecken a Cross), Landesmeeschter 800m (indoor), duerno Langstreckenleefer an zënter 2016 Du- an Triathlet (Landesmeeschter Triathlon Sprintdistanz), Brevet \"LUXQF3\" (C-Schäin)"},{"type":"heading","text":"Mieke KOSTER"},{"type":"paragraph","text":"Brevet \"LUXQF3\" (C-Schäin)"},{"type":"heading","text":"Olivier LESSIRE"},{"type":"paragraph","text":"Brevet ADEPS (Courses) Brevet ADEPS (Sauts)"},{"type":"heading","text":"Romain POSSING"},{"type":"paragraph","text":"Brevet \"LUXQF3\" (C-Schäin)"},{"type":"heading","text":"Josée SCHAEFER"},{"type":"paragraph","text":"Brevet \"LUXQF1\" (initiateur d’athlétisme)"},{"type":"heading","text":"Anne SIEBENALER"},{"type":"paragraph","text":"Student Sportwissenschaften Brevet \"LUXQF4\" (B-Schäin)"},{"type":"heading","text":"Sebastiaan VAN DEN HEUVEL"},{"type":"paragraph","text":"Brevet \"LUXQF3\" (C-Schäin)"},{"type":"heading","text":"Jang WINANDY"},{"type":"heading","text":"Kenny-Neal WOLMERING"},{"type":"paragraph","text":"Student Sportwissenschaften Brevet \"LUXQF4\" (B-Schäin)"},{"type":"heading","text":"Triathlon"},{"type":"heading","text":"Steve FELLER"},{"type":"heading","text":"Tom HEMMEN"},{"type":"paragraph","text":"Brevet \"LUXQF3\" (C-Schäin)"},{"type":"heading","text":"Max SCHROEDER"},{"type":"heading","text":"Jean-Marc WAGNER"}]}'::jsonb)
on conflict (id) do nothing;
insert into public.pages (id, slug, title, body)
values (md5('page:club/comite')::uuid, 'club/comite', '{"lb":"Président"}'::jsonb, '{"lb":[{"type":"heading","text":"Président"},{"type":"paragraph","text":"Marc FUNCK"},{"type":"heading","text":"Vice-président"},{"type":"paragraph","text":"Joel WEIS"},{"type":"heading","text":"Secrétaire Général"},{"type":"paragraph","text":"Monique REISER"},{"type":"heading","text":"Secrétaire Général Adjoint"},{"type":"paragraph","text":"Elisabeth HOFFMANN"},{"type":"heading","text":"Trésorier"},{"type":"paragraph","text":"Annie JUCHEMES Luc SCHELLER"},{"type":"heading","text":"Membres"},{"type":"paragraph","text":"Steve ANGELSBERG Jeff MATHAY Anne REISER Aline SAUBER Michel USELDINGER"},{"type":"heading","text":"Coordinateur sportif"},{"type":"paragraph","text":"Joel WEIS"},{"type":"heading","text":"Responsable Licences"},{"type":"paragraph","text":"Monique REISER"},{"type":"heading","text":"Représentants des athlètes"},{"type":"paragraph","text":"Lara ANGELSBERG Jamie LEY"}]}'::jsonb)
on conflict (id) do nothing;
insert into public.pages (id, slug, title, body)
values (md5('page:club/stadion')::uuid, 'club/stadion', '{"lb":"Stade Municipal Diekirch rue Merten L - 9257 DIEKIRCH"}'::jsonb, '{"lb":[{"type":"heading","text":"Stade Municipal Diekirch rue Merten L - 9257 DIEKIRCH"}]}'::jsonb)
on conflict (id) do nothing;
insert into public.pages (id, slug, title, body)
values (md5('page:club/trainingscamp')::uuid, 'club/trainingscamp', '{"lb":"Palamos/Palafrugell 26. Abrëll bis den 04. Abrëll 2026"}'::jsonb, '{"lb":[{"type":"heading","text":"Palamos/Palafrugell 26. Abrëll bis den 04. Abrëll 2026"},{"type":"paragraph","text":"- Départ zu Dikrech, Doneschdes Owes, de 26. März 2026 (19:30 Auer)"},{"type":"paragraph","text":"- Départ–retour zu La Fosca Freides, den 03. Abrëll 2026 am Hotel Ancora"},{"type":"paragraph","text":"- Mir sin also zréck, Samsdes, den 04. Abrëll 2026 Moies ca. 10:00 Auer"},{"type":"paragraph","text":"Mir hunn also 8 Trainingsdeeg zur Verfügung."}]}'::jsonb)
on conflict (id) do nothing;
insert into public.pages (id, slug, title, body)
values (md5('page:zenter-1968')::uuid, 'zenter-1968', '{"lb":"Liichtathletik zu Dikrich virum Celtic"}'::jsonb, '{"lb":[{"type":"heading","text":"Liichtathletik zu Dikrich virum Celtic"},{"type":"paragraph","text":"Liichtathletikaktivitéiten zu Dikrich gëtt et net réicht zënter datt den CELTIC besteet. Schon de 16.Juli 1916 gouf zu Dikrich een neie Rekord am Speerwerfen opgestallt, deemols mat 42,48 Meter, an 1943 huet de Josy Barthel zu Dikrich seng éischt 1500 Meter gewonnen."},{"type":"paragraph","text":"De Celtic war och net deen éischte Liichtathletikveräin hei zu Dikrich. An den 30iger Jore gouf et eng Liichtathletiksektioun bei de Young-Boys, wou besonnesch de Paul Hammer ee vun deene Beschten am Land war. Méi spéit gouf et da während enger Rei vu Joren den ACD, den Athletic-Club Dikrich."},{"type":"heading","text":"Ee laangen Ulaf"},{"type":"paragraph","text":"De Start vum heitige Liichtathletikveräin gouf ët am Fong geholl 2 mol. An den Ufanks 60ziger Joren hat dee verstuerwene Sportsfrënd Jos Medernach d’Iddi an den Dram zu Dikrich ee Liichtathletikveräin an d’Sportswelt ze setzen. Als engagéierten Dirigent am Basketballclub, hat hien erreecht, datt deen deemolige Basketballclub BBCD seng Strukturen geännert huet, fir vun do un als Veräin mat méi Sportsektiounen ze funktionnéieren an dat ënnert deem neien Numm Cercle Sportif Standard Diekirch."},{"type":"paragraph","text":"Wann och d’Ausgangssportsektioun, de Basket, voll fonktionnéiert huet, dann hat awer di geplangte Liichtathletiksektioun déck Problemer fir op d’Been ze kommen. Fir als Liichtathletikveräin an d’FLA, Fédération Luxembourgeoise d’Athlétisme, opgeholl ze ginn, huet ee mussen 10 Lizenze vun aktive Liichtathlete viirleeën. Dee Quorum huet de Jos awer réicht Joere méi spéit erreecht wéi massiv Hëllef vu bausse komm ass. An dat goung esou."},{"type":"paragraph","text":"Nodeems de Léi Moureaud 1964 bei de Landesmeeschterschaften am Cross vun der LASEL hei zu Dikrich bei den Non-Licencés de Championstitel kritt hat, ware sämtlich Spëtzeveräiner hannert him heer fir hien als Member an hire Veräin ze kréien. Hien huet dunn eng Lizenz bei der Fola Esch ënnerschriwen. Dem Léi seng Begeeschterung fir d’Liichtathletik a säin Trainertalent hunn du bewierkt, datt bis 1968 nach 14 aner Dikricher eng Lizenz an der Fola haten a regelméisseg a mat vill Erfolleg déi rout a wäiss Folasfaarwe verdeedigt hunn. Mä de Léi hung vill ze vill u sengem Dikrich fir datt dat nach sollt Joere sou weider goen: ëmmer fir eng „aner“ Uertschaft/Veräin ze lafen."}]}'::jsonb)
on conflict (id) do nothing;
insert into public.pages (id, slug, title, body)
values (md5('page:zenter-1968/grennung')::uuid, 'zenter-1968/grennung', '{"lb":"1. Etapp : 18.10. 1968 an 27.11.1969"}'::jsonb, '{"lb":[{"type":"heading","text":"1. Etapp : 18.10. 1968 an 27.11.1969"},{"type":"paragraph","text":"1968 goufen dann de Jos an de Léi, déi 2 fréier Noperen aus der rue des Artisans sich eens : encouragéiert vun eisem Olympiasieger Josy Barthel konnt de Léi ënnert der Presidentschaft vum Erny Thiel, ee Comité op d’Bee setzen an du mat senge 14 Kollegen den Transfert maachen . Dunn hat de Jos säi Quorum an Dikrich een neie Liichtathletikveräin, als Sektioun vum CS Standard. An der Grënnungsversammlung, déi den 18. Oktober 1968 am Cinemassall vum Kolléisch war, ass dee folgende Comité ugetrueden: Erny Thiel (President) Jean-Pierre Kraemer (Vice-President) Dr Raymond Meyers (Conseiller médical), Léi Moureaud (Sekretär), Will Lorang (Trésorier) Norbert Toussaint a Paul Werer (Memberen)."},{"type":"paragraph","text":"Am Abrëll 1969 hunn d’Athleten, deemols nach eng reng Männersektioun, un deem éischte Meeting fir hiren neie Veräin deelgeholl. D’Begeeschterung war grouss. Dat éischt Joer konnt schon de Championstitel an der 3ter Divisoun gefeiert ginn an Enn 1969 goufe schon 80 Lizenze gezielt."},{"type":"paragraph","text":"Mee an dem grousse Standard huet d’Häerz vun der Direktioun zevill eeseitig fir de Basket geschloen, deemno gouf beschloss sich selbstännig ze maachen."},{"type":"heading","text":"2. Etapp: 27.11.1969, endlech"},{"type":"paragraph","text":"An enger extraordinairer Generalversammlung huet de 27. November 1969 d’Liichtathletiksektioun sich vum CS Standard lassgeléist a sich als autonome Liichtathletikveräin ënner dem Numm Cercle Athlétique CELTIC DIEKIRCH konstituéiert a funktionnéiert zënter dem 5. November 1976 als Association sans but lucratif."},{"type":"paragraph","text":"1970 goufen dann och di éischt Damme-Lizenzen ënnerschriwen. Ufank de 90zeger Joeren sin och nach den Duathlon an den Triathlon derbäikomm. Den Celtic ass och an der Triathlonfédératioun ageschriwen."}]}'::jsonb)
on conflict (id) do nothing;
insert into public.pages (id, slug, title, body)
values (md5('page:zenter-1968/trainingsmeiglechkeeten')::uuid, 'zenter-1968/trainingsmeiglechkeeten', '{"lb":"Entwecklung vun den Trainingsméiglechkeeten"}'::jsonb, '{"lb":[{"type":"heading","text":"Entwecklung vun den Trainingsméiglechkeeten"},{"type":"paragraph","text":"Trainéiert gouf am Ufank haaptsächlech op deem alen Hypodrom a wann et gereent huet ënnert dem Iwerdaach vun de Päerdsställ laanst d’Fielser Strooss."},{"type":"paragraph","text":"Dank de gudde Relatioune mat der Arméi, huet sech dunn och d’Méiglechkeet erginn, fir op der Piste vun der Arméi um Härebierg ze trainéieren. E grousse Problem waren do awer op der enger Säit di militärisch Virschrëfte fir d’Benotze vun de Sportsinfrastrukturen, Hal a Piste, an op der aner Säit de Problem vum Transport vun Athlete an Trainingsmaterial op de Bierg. Di allermeest vun den Athlete ware Studenten an hate keen Auto; eng Bomm weit 7 Kilo, een Hummer och, een Diskus weit 2 Kilo an ee Speer ass 2 Meter laang."},{"type":"paragraph","text":"Den 9. Juni 1984 war ee wichtige Dag fir den Celtic an d’Dikricher Sportswelt. Do gouf deen neie Stadion mat Lafpiste ageweit. Vun deem Dag un ass de Celtic Training Mëttwochs a Freides vun 18.00 bis 20.00 um Stadion an an der Sportshal niewendrunn. Déi 4 Stonnen pro Woch vun de Sportinfrastrukturen vun Dikrich profitéieren ze kënnen, war eng wesentlech Verbesserung fir den Training vum Celtic."},{"type":"paragraph","text":"Zënter 2009 kritt de Celtic nach weider Trainingsinfrastrukturen duerch d’Gemeng, den LCD an d’Entente des Sociétés Sportives vun Dikrich wieder 4 Stonnen zur Verfügung gestallt. Niewend dem Stadion sin dat d’Sporthal vum LCD (Neit Gebei) an d’Sportshal vun der neier Primärschoul."},{"type":"heading","text":"Evolutioun vum Trainerstaff"},{"type":"paragraph","text":"Di éischt 20 Joer gouf de ganzen Training vun engem, resp. 2 Trainer gehalen, dem Léi an dem Tunn Moureaud. Haut sinn et der eng gutt Dosen."},{"type":"paragraph","text":"Deemols gouf et 4 Alterskategorien, haut sinn et der 10, an dat souwuel bei de Meedercher/Dammen, wi och bei de Jongen/Hären. Deemols haten di jéngst Memberen 13/14 Joer, haut hun se 6 Joer."}]}'::jsonb)
on conflict (id) do nothing;
insert into public.pages (id, slug, title, body)
values (md5('page:zenter-1968/sportlech-entwecklung')::uuid, 'zenter-1968/sportlech-entwecklung', '{"lb":"Sportlech Entwecklung"}'::jsonb, '{"lb":[{"type":"heading","text":"Sportlech Entwecklung"},{"type":"paragraph","text":"An all deene Joeren hunn d’Celtics-Athletinnen an Athleten u praktisch allen Organisatiounen, inklusiv Championaten, hei am Land op der Piste, op der Strooss a bei den Dua-an Triathlonen deelgeholl."},{"type":"paragraph","text":"Wäit iwer 300 Championstitele individuell a par équipe bei den Dammen an Hären hun eis Athletinnen an Athleten erkämpft."},{"type":"paragraph","text":"Deen éischte Landesrekord bei den Dammen ass d’Mady Petit-Scholtes iwer 400 m Hürde gelaf (07.06.1986). Den éischte Landesrekord vun engem Celtic-Athlet geet op e Kont vum Marc Goedert am Speerwerfen ( 25.04.1993 bei der Coupe d’Europe zu Dublin)."},{"type":"paragraph","text":"2001 gouf d’Chantal Hayen zur beschte Lëtzebuerger Liichtathletin vum Joer gewielt. D’Chantal war och déi éischt Celtic Athletin bei enger Liichtathletik WM an déi éischt Celtic Athletin bei de Jeux de la Francophonie (2009). De Steve Thull war deen éischten Celtic Sportler dee sech fir eng WM qualifizéiert huet, dat war am Triathlon. Weider international präsent Celtic Sportler waren Kim Schartz, Jil Gloesener, Joanne Schartz, Jérôme Even, Jemp Ernzen, Dustin Rischard, Christian Molitor, Ben Bertemes."},{"type":"paragraph","text":"Houfreg ass de CELTIC och op d’Gold- Sëlver- a Bronzemedaillen, déi seng Athleten Pascale Schmoetten, Chantal Hayen, Martine Mellina, Laurence Thill, Mady Petit, Claude Assel, Jens Petit a Paul Zens op de Spiller vun deene Klenge Länner kruten. D‘selwecht wéi op déi 2 Goldmedaille vum Danièle Lentz op der Weltmeesterschaft bei de Masters 2002 am Duathlon op der laanger Distanz an 2003 am Duathlon op der klassischer Distanz."},{"type":"paragraph","text":"De CELTIC huet als Champion Lëtzebuerg op enger Coupe d‘Europe fir Clibb vertrueden:"},{"type":"heading","text":"Dammen: European Champion Clubs Cup Cross-country"},{"type":"paragraph","text":"1998 zu Lanciano /(ITA) 1999 zu Salamanca (ESP) 2000 zu Villamoura (POR) 2001 zu Bilbao (ESP) 2004 zu Lanciano (ITA) 2005 zu Mantova (ITA) 2006 zu Caceres (ESP) 2007 zu Istanbul (TUR) 2008 zu Albufeira (POR) 2009 zu Istanbul (TUR)"},{"type":"heading","text":"European Champion Clubs Cup Juniorinnen Cross-country"},{"type":"paragraph","text":"2008 zu Albufeira (POR) 2009 zu Istanbul (TUR)"},{"type":"heading","text":"Dammen European Champion Clubs Cup Liichtathletik"},{"type":"paragraph","text":"1989 zu Zürich / Schweiz"},{"type":"heading","text":"Dammen Coupe d’Europe op der Strooss 15 Km"},{"type":"paragraph","text":"1999 zu Braga / Portugal 2000 zu Moskau / Russland 2001 zu Salo / Italien"},{"type":"heading","text":"Hären European Champion Clubs Cup Cross-country"},{"type":"paragraph","text":"1982 zu Clusone / Italien 1983 zu Lyon / Frankräich 1985 zu Albufeira / Portugal 1989 zu Albufeira / Portugal 1990 zu Albufeira / Portugal 1991 zu Alicante / Spuenien 1992 zu Marignane / Frankräich 2001 zu Saint Junien / Frankräich 2004 zu Almeirim / Spuenien"},{"type":"heading","text":"European Champion Clubs Cup Cross-country Junior"},{"type":"paragraph","text":"2006 zu Caceres (ESP) 2008 zu Albufeira (POR)"},{"type":"heading","text":"Hären Coupe d’Europe op der Strooss 15 Km"},{"type":"paragraph","text":"1994 zu Verona / Italien 2002 zu Lissabon / Portugal"}]}'::jsonb)
on conflict (id) do nothing;
insert into public.pages (id, slug, title, body)
values (md5('page:zenter-1968/historique')::uuid, 'zenter-1968/historique', '{"lb":"Podium Siebenkampf 1990"}'::jsonb, '{"lb":[{"type":"heading","text":"Podium Siebenkampf 1990"},{"type":"paragraph","text":"Podium vum internationalen Siebenkampf 1990 zu Dikrich 1. Anke Straschewski Bayer Leverkusen 6. Danièle Konter vu Gréivemaacher Lëtzëbuerger Championne 9. Sonja Leches Spora Vizechampionne."}]}'::jsonb)
on conflict (id) do nothing;
insert into public.pages (id, slug, title, body)
values (md5('page:beschtleeschtungen')::uuid, 'beschtleeschtungen', '{"lb":"Staffel-Beschtleeschtungen Damen"}'::jsonb, '{"lb":[{"type":"heading","text":"Staffel-Beschtleeschtungen Damen"}]}'::jsonb)
on conflict (id) do nothing;
insert into public.pages (id, slug, title, body)
values (md5('page:celtics-best')::uuid, 'celtics-best', '{"lb":"100 m"}'::jsonb, '{"lb":[{"type":"heading","text":"100 m"},{"type":"heading","text":"200 m"},{"type":"heading","text":"400 m"},{"type":"heading","text":"800 m"},{"type":"heading","text":"1 000 m"},{"type":"heading","text":"1 500 m"},{"type":"heading","text":"3 000 m"},{"type":"heading","text":"5 000 m"},{"type":"heading","text":"10 000 m"},{"type":"heading","text":"100 m Hecken 0,838 m"},{"type":"heading","text":"400 m Hecken 0,762 m"},{"type":"heading","text":"2 000 m Steeple"},{"type":"heading","text":"3 000 m Steeple"},{"type":"heading","text":"Weitsprong"},{"type":"heading","text":"Dreisprong"},{"type":"heading","text":"Hochsprung"},{"type":"heading","text":"Stafhéichsprong"},{"type":"heading","text":"Bomstoussen"},{"type":"heading","text":"Diskus 1Kg"},{"type":"heading","text":"Speer bis 31.12.1998"},{"type":"heading","text":"Speer vun 01.01.1999 un"},{"type":"heading","text":"Hummer"}]}'::jsonb)
on conflict (id) do nothing;
insert into public.pages (id, slug, title, body)
values (md5('page:jugend')::uuid, 'jugend', '{"lb":"Déi Jéngst dat sin d''Athletinnen an d''Athleten aus de Kategorien Ludiques (U8), Benjamins (U10), Débutants (U12) a Scolaires (U14)."}'::jsonb, '{"lb":[{"type":"heading","text":"Déi Jéngst dat sin d''Athletinnen an d''Athleten aus de Kategorien Ludiques (U8), Benjamins (U10), Débutants (U12) a Scolaires (U14)."},{"type":"paragraph","text":"Fir d''Saision 2026 (gëlt ab 1.1.2026) sin d''Kategorien dei heiten: 2021 + 2020 + 2019: U8 Ludiques (U8) 2018 + 2017: U10 Benjamins (U10) 2016 + 2015: U12 Débutants (U12) 2014 + 2013: U14 Scolaires (U14)"},{"type":"heading","text":"Trainer & Training & Allgemeng Infoen"},{"type":"paragraph","text":"Trainer Aline Kiesch Josée Schaefer Stefan Kornelis Mieke Koster Elisabeth Hoffmann Anne Siebenaler Sebastiaan Van den Heuvel Jang Winandy Kenny-Neal Wolmering Romain Possing"},{"type":"paragraph","text":"Training Mëttwoch: 18.00 bis 20.00 Auer, centre sportif + stade municipal, rue Joseph Merten Diekirch Freideg: 18.00 bis 20.00 Auer, centre sportif + stade municipal, rue Joseph Merten Diekirch Manifestatiounen a Compétitiounen Fir Ludiques a Benjamins get et den Kids Cup an am Wanter speziell Coursen am Kader fun den Cross Country Meetinger. Fir Débutants a Scolaires get et den Challenge Tageblatt an am Wanter d''Cross Country Meetinger."},{"type":"paragraph","text":"Allgemeng Informatiounen iwwer d''Manifestatiounen, d''Aschreiwungen etc kréien d''Athleten bei hirem Trainer oder beim sportlech Responsablen vum Celtic, dem Joël Weis."}]}'::jsonb)
on conflict (id) do nothing;

commit;
