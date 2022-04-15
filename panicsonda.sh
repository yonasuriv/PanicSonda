#!/bin/sh
. ./.shcss.sh

menu () {
echo "$greybgwhite Menu $end"
echo
echo "  1) Run Fluxion"
echo
echo "$grey Security auditing and social-engineering research tool. It is a remake of linset by vk496 with fewer bugs and more functionality.$end"
echo
echo "  2) Run Discover"
echo
echo "$grey Custom bash scripts used to automate various penetration testing tasks,
 including recon, scanning, parsing, and creating malicious payloads and listeners with Metasploit. $end"
echo
echo "  3) Install WannaCry BugSwarm"
echo
echo "$grey A collection of cute but deadly viruses based on the worst pest disasters in history.
 They will instantly snatch control from you. Then will sicken your high-end PC by overflowing the RAM & overwhelming the processor. 
 And you will see your computer groaning till it crashes. Believe me, viruses were never so lovely before.$end"
echo
echo "  4) Install Rubber Dockie"
echo
echo "$grey USB Machine Stealer.$end"
echo
echo "  0) Exit"
echo
echo "  $red2 Run$end types data will be saved in your$red2 home$end directory as$red2 hidden$end files."
echo
echo "  $red2 Install$end types data will be saved in your $red2 Panic Sonda$end folder in your$red2 home$end directory."
echo
echo -n "Choose one of the above options: "
read selection
echo
case $selection in
  1) fluxion ; menu_return;;
  2) discover ; menu_return;;
  3) wannacrybugswarm ; menu_return;;
  4) rubberdockie ; menu_return;;
  0) exit;;
  *) exit;;
esac
}

menu_return (){
while true; do
    read -p "Would you like to go back to the main menu? [y/n] "  input
    case $input in
        [yY]*)
            clear
            logo 
            menu
            break
            ;;
        [nN]*)
            credits
            exit 1
            ;;
         *)
            echo
            incorrect_selection_letter
            echo
            menu
    esac
done
}

fluxion () {
git clone https://www.github.com/FluxionNetwork/fluxion.git ~/.fluxion
cd ~/.fluxion
success
sudo ./fluxion.sh -i
echo
}

discover () {
git clone https://github.com/leebaird/discover ~/.discover
cd ~/.discover
success
sudo ./update.sh
echo
}

wannacrybugswarm () {
git clone https://github.com/yonasuriv/wannacry-bugswarm ~/Panic\ Sonda/
echo
success
echo
echo $red These tools are extremely dangerous, use them with caution.$end
echo
}

rubberdockie () {
git clone https://github.com/yonasuriv/rubberdockie ~/Panic\ Sonda/
cd rubberdockie/
success
open setupmanual
echo
}

success () {
echo
echo "$green2 Sucessfully installed in  `pwd`  $end"
echo
sleep 2
}

loader_logo () {
logo
echo """$grey
██████╗ ███████╗███╗   ██╗███████╗████████╗██████╗  █████╗ ████████╗██╗ ██████╗ ███╗   ██╗
██╔══██╗██╔════╝████╗  ██║██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║
██████╔╝█████╗  ██╔██╗ ██║█████╗     ██║   ██████╔╝███████║   ██║   ██║██║   ██║██╔██╗ ██║
██╔═══╝ ██╔══╝  ██║╚██╗██║██╔══╝     ██║   ██╔══██╗██╔══██║   ██║   ██║██║   ██║██║╚██╗██║
██║     ███████╗██║ ╚████║███████╗   ██║   ██║  ██║██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║
╚═╝     ╚══════╝╚═╝  ╚═══╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
████████╗███████╗███████╗████████╗██╗███╗   ██╗ ██████╗ 
╚══██╔══╝██╔════╝██╔════╝╚══██╔══╝██║████╗  ██║██╔════╝ 
   ██║   █████╗  ███████╗   ██║   ██║██╔██╗ ██║██║  ███╗
   ██║   ██╔══╝  ╚════██║   ██║   ██║██║╚██╗██║██║   ██║
   ██║   ███████╗███████║   ██║   ██║██║ ╚████║╚██████╔╝
   ╚═╝   ╚══════╝╚══════╝   ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝ 
███████╗██████╗  █████╗ ███╗   ███╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗  ██╗
██╔════╝██╔══██╗██╔══██╗████╗ ████║██╔════╝██║    ██║██╔═══██╗██╔══██╗██║ ██╔╝
█████╗  ██████╔╝███████║██╔████╔██║█████╗  ██║ █╗ ██║██║   ██║██████╔╝█████╔╝ 
██╔══╝  ██╔══██╗██╔══██║██║╚██╔╝██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██╔═██╗ 
██║     ██║  ██║██║  ██║██║ ╚═╝ ██║███████╗╚███╔███╔╝╚██████╔╝██║  ██║██║  ██╗
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝
$end"""
sleep 3
clear
}

logo () {
echo """$red
██████╗  █████╗ ███╗   ██╗██╗ ██████╗    ███████╗ ██████╗ ███╗   ██╗██████╗  █████╗ 
██╔══██╗██╔══██╗████╗  ██║██║██╔════╝    ██╔════╝██╔═══██╗████╗  ██║██╔══██╗██╔══██╗
██████╔╝███████║██╔██╗ ██║██║██║         ███████╗██║   ██║██╔██╗ ██║██║  ██║███████║
██╔═══╝ ██╔══██║██║╚██╗██║██║██║         ╚════██║██║   ██║██║╚██╗██║██║  ██║██╔══██║
██║     ██║  ██║██║ ╚████║██║╚██████╗    ███████║╚██████╔╝██║ ╚████║██████╔╝██║  ██║
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝ ╚═════╝    ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝
$end"""
}

loader () {
clear
echo 
credits
sleep 1
echo Starting..
sleep 2
clear
}

credits () {
clear
echo 
echo Script created by: Jonathan Di Rico
echo https://yonasuriv.github.io/
echo
}

### Script Start


clear
loader
loader_logo
logo
menu
