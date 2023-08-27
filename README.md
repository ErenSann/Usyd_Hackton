# Usyd_Hackton

download mysql at https://dev.mysql.com/downloads/mysql/

create a database named hackton
create a user named admin with password admin

    MySql commands:
        CREATE DATABASE hackton;
        CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';
        GRANT ALL PRIVILEGES ON hackton.* TO 'admin'@'localhost';
        FLUSH PRIVILEGES;
        Connect hackton
        
pip install -r requirements.txt

python main.py
