@echo off
(for /f delims^= %%i in ('dir /b /ad') do (
set "file=%%i"
call echo +font-face("%%file:%cd%=%%"^, "../fonts/%%file:%cd%=%%/%%file:%cd%=%%"^)
)) > ../css/_fonts/_fonts_list.sass