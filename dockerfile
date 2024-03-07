FROM nginx:1.10.1-alpine

# content copy:
# COPY index.html /usr/share/nginx/html
COPY . /usr/share/nginx/html/

# EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
