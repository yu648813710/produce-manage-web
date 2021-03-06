FROM centos:centos7
LABEL maintainer="Vicente Zepeda <chente.z.m@gmail.com>"

ENV nginxversion="1.14.0-1" \
    os="centos" \
    osversion="7" \
    elversion="7_4"

RUN yum install -y wget openssl sed &&\
    yum -y autoremove &&\
    yum clean all &&\
    wget http://nginx.org/packages/$os/$osversion/x86_64/RPMS/nginx-$nginxversion.el$elversion.ngx.x86_64.rpm &&\
    rpm -iv nginx-$nginxversion.el$elversion.ngx.x86_64.rpm
RUN mkdir -p /etc/nginx
RUN mkdir -p /data/www
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist /data/www/
COPY public/financing /data/www/financing/
COPY public/investment /data/www/investment/
RUN chmod 777 -R /data/

VOLUME [ "/data/www" ]
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
