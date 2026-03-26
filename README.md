# DAMAGER Website

Official website for the DAMAGER project — stuDy of Additive ManufActuring
for low-cost, low-observable, hiGhly-deployable, expendablE/attritable
tuRbojet engines.

Funded by the European Defence Fund (EDF) — Grant Agreement No. 101224541

---

## Project

| Field | Value |
|-------|-------|
| Full name | stuDy of Additive ManufActuring for low-cost, low-observable, hiGhly-deployable, expendablE/attritable tuRbojet engines |
| Acronym | DAMAGER |
| Programme | European Defence Fund (EDF) 2024 |
| Duration | 48 months (01/12/2025 – 30/11/2029) |
| Coordinator | HIT09 SRL (Italy) |
| Website | https://damager.eu |

## Tech Stack

- Static Site Generator: [Hugo Extended](https://gohugo.io/)
- CMS: [Decap CMS](https://decapcms.org/) — accessible at `/admin`
- Hosting: [Netlify](https://www.netlify.com/) (free tier)
- Authentication: Netlify Identity
- Forms: Netlify Forms
- Cookie Consent: [Vanilla Cookie Consent](https://cookieconsent.orestbida.com/)

## Local Development

**Prerequisites:** Hugo Extended installed (`winget install Hugo.Hugo.Extended`)

```bash
git clone https://github.com/ergonresearch/damager-website.git
cd damager-website
hugo server
```

Then open: http://localhost:1313

> Note: Netlify Forms and CMS `/admin` are only functional on the deployed Netlify environment.

## Branches

| Branch | Purpose |
|--------|---------|
| `main` | Production — auto-deployed by Netlify |
| `develop` | Daily development work |

**Daily workflow:**
```bash
git checkout develop
# ... make changes ...
git add .
git commit -m "feat: description"
git push origin develop

# To publish:
git checkout main && git merge develop && git push origin main
git checkout develop
```

## CMS Access

After deployment: https://damager.eu/admin  
Authentication: Netlify Identity (invite-only — contact the project coordinator)

## Legal

*This project has received funding from the European Defence Fund (EDF) under Grant Agreement No. 101224541. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union (EU) or European Defence Agency (EDA). Neither the European Union nor the granting authority can be held responsible for them.*
