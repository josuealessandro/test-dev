-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 17-Ago-2017 às 03:35
-- Versão do servidor: 10.1.25-MariaDB
-- PHP Version: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbcarro`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_carro`
--

CREATE TABLE `tb_carro` (
  `ID_CARRO` int(11) NOT NULL,
  `NOME_MARCA` varchar(50) DEFAULT NULL,
  `NOME_MODELO` varchar(50) DEFAULT NULL,
  `ANO` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Tabela referente ao objeto carro';

--
-- Extraindo dados da tabela `tb_carro`
--

INSERT INTO `tb_carro` (`ID_CARRO`, `NOME_MARCA`, `NOME_MODELO`, `ANO`) VALUES
(2, 'BMW', 'i8', 2015),
(4, 'Hyundai', 'HB20S', 2018);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_carro`
--
ALTER TABLE `tb_carro`
  ADD PRIMARY KEY (`ID_CARRO`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_carro`
--
ALTER TABLE `tb_carro`
  MODIFY `ID_CARRO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
