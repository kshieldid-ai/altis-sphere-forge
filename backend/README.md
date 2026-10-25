# Backend « downloads »

API Django en lecture seule qui alimente la page **Téléchargements** du site.
Les éléments se gèrent depuis l'admin Django (`/admin/`). Le site affiche
toujours la liste fixe de `src/data/downloads.ts`, puis y ajoute les éléments
de cette API. Si l'API ne répond pas, seule la liste fixe est affichée.

## Lancer en local

```bash
cd backend
python -m venv venv
venv\Scripts\activate            # Windows (Linux/macOS : source venv/bin/activate)
pip install -r requirements.txt
set DJANGO_DEBUG=1               # PowerShell : $env:DJANGO_DEBUG="1"
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 8001
```

Le front (`npm run dev`) lit l'API via `VITE_DOWNLOADS_API_URL` dans
`.env.development` (`http://localhost:8001/api/downloads`).

## Variables d'environnement (production)

| Variable | Rôle |
|---|---|
| `DJANGO_SECRET_KEY` | Obligatoire hors debug ; Django refuse de démarrer sans. |
| `DJANGO_DEBUG` | `1` en local uniquement. |
| `DJANGO_ALLOWED_HOSTS` | Domaines servis, séparés par des virgules. |
| `DJANGO_CORS_ORIGINS` | Origines autorisées (par défaut : altisphere-group.com et localhost:8080). |

Une fois le backend en ligne, renseigner `VITE_DOWNLOADS_API_URL` dans
`.env.production` du front.

## Endpoints

- `GET /api/downloads/items/` : liste des éléments
- `GET /api/downloads/items/<id>/` : détail

Toute écriture (POST, PUT, DELETE) renvoie 405.
