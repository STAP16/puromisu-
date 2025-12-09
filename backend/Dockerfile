FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем весь проект внутрь контейнера
COPY . .

EXPOSE 8000

ENV PYTHONPATH=/app:/app/app

# Явно указываем полный модуль приложения, чтобы избежать проблем с путём
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]