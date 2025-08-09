FROM python:3.11-slim

WORKDIR /app

# Installeer benodigde packages
RUN pip install fal-client fastapi uvicorn

# Kopieer applicatie bestanden
COPY . .

# Expose poort
EXPOSE 8000

# Start de applicatie
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
