
## Use Python environment

```bash
virtualenv venv
source venv/bin/activate
```

## Install Python dependencies

```bash
pip install requirement.txt
```

## Start development server

```bash
python3 server/app.py

#vercel dev
```

## Start production server

```bash
venv/bin/gunicorn server.app:app
```