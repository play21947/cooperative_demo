-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 04, 2022 at 08:18 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cooperative`
--

-- --------------------------------------------------------

--
-- Table structure for table `share`
--

CREATE TABLE `share` (
  `id` int(11) NOT NULL,
  `combine_share` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `share`
--

INSERT INTO `share` (`id`, `combine_share`) VALUES
(1, 700);

-- --------------------------------------------------------

--
-- Table structure for table `share_myself`
--

CREATE TABLE `share_myself` (
  `id` int(11) NOT NULL,
  `user_id` int(255) NOT NULL,
  `total_share` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `user_id` int(255) NOT NULL,
  `amount` int(255) NOT NULL,
  `date` text NOT NULL,
  `frequent_money` int(255) NOT NULL,
  `times` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `user_id`, `amount`, `date`, `frequent_money`, `times`) VALUES
(1, 127, 100, '4/10/2565', 100, 1),
(2, 127, 100, '4/11/2565', 200, 2),
(3, 127, 100, '4/12/2565', 300, 3),
(4, 112, 100, '4/10/2565', 400, 1),
(5, 127, 100, '4/1/2566', 500, 4),
(6, 127, 100, '5/10/2565', 600, 5),
(7, 127, 100, '5/10/2565', 700, 6);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `prefix` text NOT NULL,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `id_card` text NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `pin` text NOT NULL,
  `role` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `prefix`, `first_name`, `last_name`, `id_card`, `username`, `password`, `pin`, `role`) VALUES
(1, 'นาย', 'รัฐนนท์', 'บุญมาตา', '1234567891123', '127', '$2b$10$9lhbfq/tumCvcKuYpI/6n.83txW7HVCBbcKwMg3UM2/cU5xkCJGvy', '123456', 0),
(2, 'นาง', 'ญาณิดา', 'บุญมาตา', '1578822022', '112', '$2b$10$9lhbfq/tumCvcKuYpI/6n.83txW7HVCBbcKwMg3UM2/cU5xkCJGvy', '123456', 0),
(3, 'นาย', 'โฟโมส', 'คูลคูล', '1788895452', '135', '$2b$10$9lhbfq/tumCvcKuYpI/6n.83txW7HVCBbcKwMg3UM2/cU5xkCJGvy', '123456', 0),
(4, 'นาย', 'admin', 'adjai', '1111111111111', 'admin', '$2b$10$9lhbfq/tumCvcKuYpI/6n.83txW7HVCBbcKwMg3UM2/cU5xkCJGvy', '123456', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `share`
--
ALTER TABLE `share`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `share_myself`
--
ALTER TABLE `share_myself`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `share`
--
ALTER TABLE `share`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `share_myself`
--
ALTER TABLE `share_myself`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
