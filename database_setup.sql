DELIMITER //

CREATE PROCEDURE sp_add_kary_wahyu_ramadan
(
  IN nip VARCHAR(18),
  IN nama VARCHAR(50),
  IN alamat TEXT,
  IN gender ENUM('Male', 'Female'),
  IN tanggal_lahir
)
BEGIN
  INSERT INTO karyawan (nip, nama, alamat, gender, tanggal_lahir)
  VALUES (nip, nama, alamat, gender, tanggal_lahir);
END //

DELIMITER ;