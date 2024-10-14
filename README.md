# Panic Sonda OSINT Search Engine

A single-page designed to streamline reconnaissance and data-gathering processes. \
This search engine integrates top-tier resources and tools, ensuring privacy and efficiency for penetration testers and security researchers.

Built with the [OSINT](https://osintframework.com/) (Open Source Intelligence) framework.

## Set it up as your home page in kali (or any distro)

```bash
echo 'user_pref("browser.startup.homepage", "https://panicsonda.github.io");' >> $(find /home -type f -name prefs.js -path "*/.mozilla/firefox/*" 2>/dev/null) && echo "\nFirefox default page updated successfully." || echo "\nFailed to set firefox default page." 
```

## Contributions

All contributions for improving or extending the tool are welcome, just:

1.  Fork the repository.
2.  Create a new feature branch.
3.  Submit a pull request for review.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

![image](https://github.com/user-attachments/assets/8cdea25e-445a-4147-8542-8548b8fac5cc)

> This project is currently in its alpha stage and is under active development.
> 
<!--
#### Default Version (lightweight)
![image](https://github.com/user-attachments/assets/9ae8d7a3-23ec-4b15-8472-4c2beb5096fe)

#### Alternate Dynamic Version (more resource-heavy)
![image](https://github.com/user-attachments/assets/2bfee70c-771e-48c0-95a9-90c67a0cdb40)-->
