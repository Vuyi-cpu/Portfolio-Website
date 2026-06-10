# Vuyisa Msipa - Portfolio Website
## Links
[1]Website: https://portfolio-website-rosy-pi-30.vercel.app/index.html or https://vuyi-cpu.github.io/Portfolio-Website/index.html

[2]Github Repo: https://github.com/Vuyi-cpu/Portfolio-Website
## Overview
 
This is the source code for my personal portfolio website, built using vanilla HTML, CSS, and JavaScript across four pages: Home, About, Portfolio, and Contact.
 
## Deviations from the PRD
 
The following sections document where the final implementation intentionally or practically differs from what was specified in the Product Requirements & Design Document.
 
### Typography Deviations

Fixed pixel values were replaced with CSS `clamp()` expressions to produce a fully fluid typographic scale that adapts gracefully across mobile, tablet, and desktop viewports without requiring explicit media-query overrides for font sizes. This better serves the responsive design goals stated in the PRD while maintaining the same visual hierarchy and Inter font family as specified.

The body text sizes in certain card and description contexts fall slightly below the 16px minimum stated in the PRD. This was an intentional design decision to reduce visual density inside constrained card layouts (project cards and goal cards), where a slightly smaller size improves readability within the available space rather than detracting from it.

Colour shades were adjusted slightly from the original PRD specification to improve contrast, accessibility, and visual hierarchy. These enhance the distinction between interface elements while preserving the overall colour palette and aesthetic.

 
### Wireframe Deviations
 
#### Home Page - Skills Section
 
- **PRD Wireframe:** The skills section showed circular icon placeholders on the left alongside a text list on the right.
- **Final Implementation:** The technology icons are rendered in a 4-column icon grid (not circles) on the left side, while the right side contains a descriptive paragraph, a divider, a "Soft Skills" label, and a two-column grid of soft skill cards. The addition of the soft skills grid was not shown in the wireframe but was present in the content inventory table (Home Page Key Content Blocks) in the PRD.

#### About Page - Career Goals Section
 
- **PRD Wireframe:** No wireframe was provided for this section; only a content block entry existed in the page inventory.
- **Final Implementation:** A two-column goal card grid was added to display short-term and long-term goals side by side on desktop, followed by a "What drives me" card below. This layout was not wireframed but fulfils the content requirements specified in the page inventory.

#### Contact Page - Social Links Section
 
- **PRD Wireframe and Content Inventory:** The contact page was specified to include a standalone social links section (LinkedIn, GitHub, Email, Instagram) alongside the contact form.
- **Final Implementation:** The standalone social links section was removed from the contact page body. Social links are accessible exclusively through the footer, which is present on every page. This decision reduces redundancy and keeps the contact page focused on the form interaction, while ensuring social links remain consistently accessible site-wide.

#### Portfolio Page - Projects Section
PRD Wireframe: The projects section displayed project cards in an alternating left-and-right arrangement, with each successive card aligned to the opposite side of the page to create visual variation.
Final Implementation: The alternating layout was replaced with a vertically stacked arrangement where all project cards share the same alignment and structure. This change was made to improve readability and user experience by creating a more consistent visual flow, reducing unnecessary eye movement, and allowing users to scan project information more efficiently. The stacked design also adapts more naturally to responsive layouts, providing a cleaner and more maintainable presentation across desktop and mobile devices.
 
## References
 
The following resources were referenced for understanding and guidance while implementing the interactions in this project.
 
[1] CodingNepal, "Loading Screen Animation using HTML CSS & JavaScript," *YouTube*, Jun. 20, 2020. [Online]. Available: https://www.youtube.com/watch?v=lczgnhMphdU. [Accessed: May 12, 2026].
 
[2] Bedimcode, "Animate on Scroll With Intersection Observer," *YouTube*, Feb. 16, 2021. [Online]. Available: https://www.youtube.com/watch?v=FRALpfypSBs. [Accessed: May 25, 2026].
 
[3] ljcdev, "Simple typing effect pure JS (beginner)," *DEV Community*, Feb. 24, 2021. [Online]. Available: https://dev.to/ljcdev/simple-typing-effect-pure-js-4p5m. [Accessed: May 30, 2026].
 
[4] Mamboleoo, "How to render 3D in 2D canvas," *Mamboleoo*, Oct. 13, 2021. [Online]. Available: https://www.mamboleoo.be/articles/how-to-render-3d-in-2d-canvas. [Accessed: Jun. 1, 2026].
 
[5] russs123, "Javascript Beginner Tutorial - Typewriter Effect with Vanilla JS," *YouTube*, Nov. 23, 2021. [Online]. Available: https://www.youtube.com/watch?v=sApSxcqwgd8. [Accessed: May 30, 2026].
 
[6] Slaying The Dragon, "Learn CSS Variables In 7 Minutes," *YouTube*, Nov. 14, 2023. [Online Video]. Available: https://www.youtube.com/watch?v=5wLrz_zUwoU. [Accessed: May 10, 2026].
 
[7] Digital Team, "Watches for gamers: A deep dive into the vintage-inspired timepiece," *The AquaNova Journal - Nubeo Watches*, Jan. 21, 2026. [Online]. Available: https://nubeowatches.com/blogs/the-aquanova-journal/watches-for-gamers-a-deep-dive-into-the-vintage-inspired-timepiece. [Accessed: June 9, 2026].
 
[8] "Electronic piano, guitar room interior," *Magnific*. [Online]. Available: https://www.magnific.com/premium-photo/electronic-piano-guitar-room-interior_28883742.htm. [Accessed: June 9, 2026].
 
[9] "Person standing on skateboard grayscale photography," *Pexels*. [Online]. Available: https://www.pexels.com/photo/person-standing-on-skateboard-grayscale-photography-58729/. [Accessed: June 9, 2026].
 
[10] "The benefits of having a workplace gym," *Link Spaces*. [Online]. Available: https://linkspaces.co.uk/the-benefits-of-having-a-workplace-gym/. [Accessed: June 9, 2026].