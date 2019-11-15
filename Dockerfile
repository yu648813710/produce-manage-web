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
RUN chmod 777 -R /data/

COPY 3088976_www.test.zhashui-muer.com.cn.pem /data/www/3088976_www.test.zhashui-muer.com.cn.pem
COPY 3088976_www.test.zhashui-muer.com.cn.key /data/www/3088976_www.test.zhashui-muer.com.cn.key

VOLUME [ "/data/www" ]
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
