FROM node:18-slim

WORKDIR /app

# Kopieer package files
COPY package*.json ./

# Installeer dependencies
RUN npm install

# Kopieer rest van de code
COPY . .

# Expose poort
EXPOSE 8000

# Start de applicatie
CMD ["npm", "start"]
