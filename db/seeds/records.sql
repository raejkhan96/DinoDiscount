INSERT INTO users (name, dob, email, post_code, phone_number, user_pic, password)
VALUES
('Ian Malcolm', '1955-06-29', 'imalcolm@gmail.com', '123ABC', '123-456-7891', 'https://static.wikia.nocookie.net/jurassicpark/images/c/c6/JP-IanMalcolm.jpg/revision/latest?cb=20111124071517', 'password'),
('John Hammond', '1928-03-14', 'jhammond@gmail.com', '124ABC', '123-456-7892', 'https://static.wikia.nocookie.net/jurassicpark/images/f/f8/JP-JohnHammond.jpg/revision/latest?cb=20080901014643', 'password'),
('Chris Pratt', '1979-06-21', 'cpratt@gmail.com', '125ABC', '123-456-7893', 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRzGnI__Ul05wKYDq3QYeoy1QbXXdWMvJpLezay515H6OiORtH-', 'password'),
('SJ', '1989-01-01', 'sjtest@test.com', 'M3K2B9', '647-123-1234', 'https://i.imgur.com/5fUVPRP.png', 'password');

INSERT INTO types (name)
VALUES
('Carnivore'),
('Herbivore'),
('Omnivore');

INSERT INTO time_period (name)
VALUES
('Triassic'),
('Jurassic'),
('Cretaceous');

INSERT INTO listings (name, price, description, picture, type_id, time_period_id, user_id, visits)
VALUES
('T-rex', 10000000, 'Scary dino', 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/rockcms/2021-04/210415-tyrannosaurus-rex-mn-1550-9612a9.jpg', 1, 3, 1, 10),
('Triceratops', 150000, 'Three horned dino', 'https://i.natgeofe.com/n/b96b572c-98e2-4ec2-a714-08a6b95cf646/triceratopshorridus_hexdcb_2x3.jpg', 2, 3, 2, 5),
('Stegosaurus', 99000, 'A large, slow moving plant-eater', 'https://discovery.sndimg.com/content/dam/images/discovery/editorial/Curiosity/2020/3/Stegosaurus_Getty_Images_SQ.png.rend.hgtvcom.406.406.suffix/1583192968245.png', 2, 2, 3, 0),
('Coloradisaurus', 240000, 'Coloradisaurus', 'https://www.nhm.ac.uk/resources/nature-online/life/dinosaurs/dinosaur-directory/images/reconstruction/small/Coloradisaurus.jpg', 3, 1, 3, 1),
('Brachiosaurus', 350000, 'Brachiosaurus held its head very high.', 'https://tinyurl.com/nrsp2fkj', 2, 2, 1, 2),
('Aegyptosaurus', 67000, 'Found in Egypt', 'https://tinyurl.com/4hpcjxht', 2, 3, 3, 0),
('Alamosaurus', 299, 'This is the only Late Cretaceous sauropod that has been found in North America.', 'https://tinyurl.com/5dc5mv6v', 2, 3, 1, 0),
('Amargasaurus', 9000, 'This dinosaur had a double row of spines along its back which may have supported a twin ‘sail’ of skin. ', 'https://tinyurl.com/42rhad9f', 2, 3, 2, 0),
('Velociraptor', 50000000, 'It was a bipedal carnivore with a long, stiffened tail and had an enlarged, sickle-shaped claw on each hindfoot, which is thought to have been used to kill its prey.', 'https://tinyurl.com/y737avxf', 2, 2, 3, 12);

INSERT INTO user_favorite (user_id, listing_id)
VALUES
(1, 2),
(1, 3),
(2, 1),
(3, 1);

INSERT INTO messages (user_sender_id, listing_id, message)
VALUES
(3, 1, 'What a magnificient T-rex!!');
