import os

def create_svg(filename, content):
    with open(filename, 'w') as f:
        f.write(content)

# 18+ Icon
create_svg('/home/ubuntu/ayachi-fantasy-cricket/client/public/18plus.svg', 
'''<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="45" fill="none" stroke="#FF8C00" stroke-width="5"/>
  <text x="50" y="65" font-family="Arial" font-size="40" font-weight="bold" fill="#FF8C00" text-anchor="middle">18+</text>
</svg>''')

# Safe & Secure Icon
create_svg('/home/ubuntu/ayachi-fantasy-cricket/client/public/safe_secure.svg', 
'''<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M50 10 L80 25 L80 50 C80 70 50 90 50 90 C50 90 20 70 20 50 L20 25 L50 10 Z" fill="none" stroke="#FF8C00" stroke-width="5"/>
  <path d="M35 50 L45 60 L65 40" fill="none" stroke="#FF8C00" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>''')

# Educational Icon
create_svg('/home/ubuntu/ayachi-fantasy-cricket/client/public/educational.svg', 
'''<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 30 L50 15 L80 30 L50 45 Z" fill="none" stroke="#FF8C00" stroke-width="5"/>
  <path d="M20 30 L20 60 C20 60 50 75 80 60 L80 30" fill="none" stroke="#FF8C00" stroke-width="5"/>
  <path d="M50 45 L50 70" fill="none" stroke="#FF8C00" stroke-width="5"/>
</svg>''')

# Logo (Simple Text-based Logo)
create_svg('/home/ubuntu/ayachi-fantasy-cricket/client/public/logo.svg', 
'''<svg width="200" height="60" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
  <text x="10" y="45" font-family="Arial" font-size="32" font-weight="bold" fill="#FF8C00">CricIQ</text>
  <text x="110" y="45" font-family="Arial" font-size="32" font-weight="bold" fill="#FFFFFF">Play</text>
</svg>''')
