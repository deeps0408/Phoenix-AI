# Use official Python slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Expose port
EXPOSE 8080

# Run FastAPI with uvicorn on Cloud Run's expected port 8080
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
