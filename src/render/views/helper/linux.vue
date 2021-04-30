<template>
  <div class="linux-container helper-container">
    <section>
      <h2>服务器环境安装</h2>
      <p>
        服务基于docker环境，
        <a
          target="_blank"
          href="https://www.cnblogs.com/yufeng218/p/8370670.html"
        >
          docker安装点击这里
        </a>
        ，第三方中间件只要能访问都可以。
      </p>
    </section>
    <section id="模拟器服务环境">
      <h3>
        <a href="#模拟器服务环境"> 模拟器服务环境 </a>
      </h3>
      <p>
        安装.NET5 Runtime
        <a
          target="_blank"
          href="https://hub.docker.com/_/microsoft-dotnet-runtime/"
        >
          .NET5 Runtime docker hub文档
        </a>
      </p>
      <div class="code">docker pull mcr.microsoft.com/dotnet/runtime:5.0</div>
      <p>
        安装rabbitmq和redis docker，其中rabbitmq安装带监视器的版本
        <a
          target="_blank"
          href="https://hub.docker.com/_/rabbitmq?tab=description&page=1&ordering=last_updated"
        >
          rabbitmq docker hub文档
        </a>
      </p>
      <div class="code">docker pull redis</div>
      <div class="code">docker pull rabbitmq:management</div>
      <p>
        安装docker-compose,由于需要启动多个容器，所以配合docker-compose来进行操作
        <a
          target="_blank"
          href="https://blog.csdn.net/ytangdigl/article/details/103831739"
        >
          centos7中docker-compose的三种安装方式
        </a>
        ，这里介绍离线安装方式。
      </p>
      <div class="code">
        访问<a
          href="https://github.com/docker/compose/releases"
          target="_blank"
        >
          https://github.com/docker/compose/releases
        </a>
        ,下载docker-compose-Linux-x86_64版本，放到/usr/local/bin
        ，且重命名为docker-compose
        <br />查看权限，添加权限 sudo chmod +x /usr/local/bin/docker-compose
        ，查看是否成功 docker-compose -v。
      </div>
    </section>
    <section id="模拟器服务运行">
      <h3>
        <a href="#模拟器服务运行"> 模拟器服务运行 </a>
      </h3>
      <p>
        docker-compose.yml配置
        <a href="https://www.jianshu.com/p/2217cfed29d7" target="_blank">
          配置详解
        </a>
        <br />
        ● version：什么版本的docker-compose对应什么版本的docker
        <a href="https://docs.docker.com/compose/compose-file/" target="_blank">
          对照表官方文档
        </a>
        <br />
        ●
        services：代表需要启动的服务，每个服务对应一个模拟器主程序，由于每个主程序都要独立的配置文件，
        所以在volumes中映射对应的文件配置目录
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;- /home/wzConfig/wanzhuang:/app
        <span class="desc">--主程序目录映射的容器/app中运行映射</span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;-
        /home/wzConfig/wanzhuangConfig/0/config:/app/config
        <span class="desc">--主程序配置文件目录映射</span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;- /home/wzConfig/wanzhuangConfig/0/Log:/app/Log
        <span class="desc">--主程序日志文件目录映射</span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;- /etc/localtime:/etc/localtime
        <span class="desc"> --容器日期和宿主机同步映射</span>
      </p>
      <div class="code">
        <div>
          <div>version:&nbsp;"3.8"</div>
          <div>services:</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;wanzhuang0:</div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;image:&nbsp;mcr.microsoft.com/dotnet/runtime:5.0-buster-slim&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;volumes:</div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;/home/wzConfig/wanzhuang:/app
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;/home/wzConfig/wanzhuangConfig/0/config:/app/config
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;/home/wzConfig/wanzhuangConfig/0/Log:/app/Log
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;/etc/localtime:/etc/localtime
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;working_dir:&nbsp;/app
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#cpu_quota:&nbsp;80000
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;restart:&nbsp;always&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;command:&nbsp;["dotnet","/app/WanZhuang.Linux.dll"]
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;wanzhuang1:</div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;image:&nbsp;mcr.microsoft.com/dotnet/runtime:5.0-buster-slim&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;volumes:</div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;/home/wzConfig/wanzhuang:/app
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;/home/wzConfig/wanzhuangConfig/1/config:/app/config
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;/home/wzConfig/wanzhuangConfig/1/Log:/app/Log
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;/etc/localtime:/etc/localtime
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;working_dir:&nbsp;/app
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;restart:&nbsp;always
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#cpu_quota:&nbsp;80000
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;command:&nbsp;["dotnet","/app/WanZhuang.Linux.dll"]
          </div>
        </div>
      </div>
    </section>
    <section id="模拟器日志收集">
      <h3>
        <a href="#模拟器日志收集"> 模拟器日志收集 </a>
      </h3>
      <p>
        默认日志是本地log记录，如果需要进行ELK收集则需要进行配置,模拟器采用自构建elasticsearch
        + logstash + kibana对接。
        <a href="https://www.cnblogs.com/fbtop/p/11005469.html" target="_blank">
          Docker安装部署ELK教程 (Elasticsearch+Kibana+Logstash+Filebeat)
        </a>
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;ELK
        docker镜像拉取,统一版本7.10.1，如果不使用filebeat模式则可以不拉取filebeat镜像,
      </p>
      <div class="code">
        docker pull elasticsearch:7.10.1<br />
        docker pull kibana:7.10.1<br />
        docker pull logstash:7.10.1<br />
        docker pull store/elastic/filebeat:7.10.1 --可忽略<br />
      </div>
      <p>ELK docker-compose.yml配置</p>
      <p>
        ● networks: <br />
        &nbsp;&nbsp;&nbsp;&nbsp;somenetwork: external: name: "somenetwork"
        <span class="desc">
          --配置网卡，名称为somenetwork，使用外部已定义名为somenetwork的网卡 </span
        ><br />

        ● elasticsearch: <br />
        &nbsp;&nbsp;&nbsp;&nbsp;environment: - discovery.type=single-node
        <span class="desc">--配置es为单节点</span><br />

        ● logstash: <br />
        &nbsp;&nbsp;&nbsp;&nbsp;-
        /home/docker/logstash/logstash.yml:/usr/share/logstash/config/logstash.yml
        <span class="desc">--映射logstash.yml到容器，具体配置下面讲解 </span
        ><br />
        &nbsp;&nbsp;&nbsp;&nbsp;-
        /home/docker/logstash/conf.d/:/usr/share/logstash/conf.d/
        <span class="desc">--映射config到容器，具体配置下面讲解</span><br />

        ● filebeat:<br />
        &nbsp;&nbsp;&nbsp;&nbsp;-
        /home/wzConfig/wanzhuangConfig/0/Log/Info/:/var/log/wz/
        <span class="desc">--映射需要收集的模拟器日志目录到容器指定目录中</span
        ><br />
        &nbsp;&nbsp;&nbsp;&nbsp;-
        /home/docker/filebeat/filebeat.yml:/usr/share/filebeat/filebeat.yml:ro
        <span class="desc">--映射filebat.yml到容器，具体配置下面讲解</span
        ><br />
        &nbsp;&nbsp;&nbsp;&nbsp;-
        /var/lib/docker/containers:/var/lib/docker/containers:ro
        <span class="desc">--映射docker容器日志目录到容器中</span><br />
        &nbsp;&nbsp;&nbsp;&nbsp;- /var/run/docker.sock:/var/run/docker.sock:ro
        <span class="desc">--映射docker守护进程，进行通讯</span><br />
      </p>
      <div class="code">
        <div>
          <div>version:&nbsp;"3.8"</div>
          <div>services:</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;elasticsearch:</div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;image:&nbsp;elasticsearch:7.10.1
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ports:</div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;9200:9200
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;9300:9300
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;environment:
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;discovery.type=single-node
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cpu_quota:&nbsp;80000
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;networks:</div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;somenetwork
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;restart:&nbsp;always
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;kibana:</div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;image:&nbsp;kibana:7.10.1
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ports:</div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;5601:5601
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;networks:</div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;somenetwork
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;restart:&nbsp;always
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;logstash:</div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;image:&nbsp;logstash:7.10.1
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ports:</div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;5044:5044
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;volumes:</div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;/home/docker/logstash/logstash.yml:/usr/share/logstash/config/logstash.yml
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;/home/docker/logstash/conf.d/:/usr/share/logstash/conf.d/
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cpu_quota:&nbsp;80000
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;networks:</div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;somenetwork
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;restart:&nbsp;always
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;filebeat:</div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;image:&nbsp;store/elastic/filebeat:7.10.1
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;volumes:
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;/home/wzConfig/wanzhuangConfig/0/Log/Info/:/var/log/wz/
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;/home/docker/filebeat/filebeat.yml:/usr/share/filebeat/filebeat.yml:ro
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;/var/lib/docker/containers:/var/lib/docker/containers:ro
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;/var/run/docker.sock:/var/run/docker.sock:ro
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;user:&nbsp;root
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;networks:
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;somenetwork
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;nginx:</div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;image:&nbsp;nginx
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ports:</div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;80:80
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;volumes:</div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;/home/docker/nginx/logs/:/var/log/nginx/
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;/home/docker/nginx/nginx.conf:/etc/nginx/nginx.conf
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;/home/docker/nginx/db/:/etc/nginx/db/
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;networks:</div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;somenetwork
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;restart:&nbsp;always
          </div>
          <div>networks:</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;somenetwork:</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;external:</div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name:&nbsp;"somenetwork"
          </div>
        </div>
      </div>
    </section>
    <section id="配置文件">
      <h3>
        <a href="#配置文件"> 配置文件 </a>
      </h3>
      <p>模拟器配置文件</p>
      <div class="code">
        <pre class="language-markup">
            <code>
{
  "AppSettings": {
    "RedisSetting": {
      "ConnectionStr": "132.232.34.148:6379,abortConnect=false,password=wagnzhuang.SocketMultiple"
    },
    "RegisterKey": "WanZhuang.Register",
    "RegisterId": "dev",
    "DefaultAesKey": "2be55c82f2126b3a2be9e3b78d58fcba",
    "DefaultDeviceNum": 4294967295,
    //Default Power Electric FastCharge
    //FastCharge Electric Power Default
    //"DeviceTypes": [ "Default", "Power", "Electric", "FastCharge", "TwoWay" ],
    "DeviceTypes": [ "TwoWay" ],
    "ServerAddress": {
      "Ip": "114.55.139.53",
      "Port": 6010
    },
    //"PayChargeUrl": "https://webapi.wanzhuangkj.com/pay/request",
    "PayChargeUrl": "https://webapi.wanzhuang-app.com/pay/request",
    "GetTokenUrl": "https://webapi.wanzhuang-app.com/auth/genUser",
    "Elasticsearch": false,
    "RabbitMQSetting": {
      "ManagerTopicRoute": "ManagerLip#",
      "SystemMsgQueueName": "ManagerLip",
      "ConnectionConfiguration": {
        "UserName": "admin",
        "Password": "wagnzhuang.SocketMultiple",
        "VirtualHost": "wanzhuang",
        "Hosts": [
          {
            "Host": "132.232.34.148",
            "Port": 5672
          }
        ]
      }
    }
  }
}
  </code>
          </pre>
      </div>
      <p>ELK 配置文件</p>
      <div class="code">
        <div>
          <div>
            <div>
              <div>logstash.yml</div>
              <div>
                &nbsp;&nbsp;&nbsp;path.config:&nbsp;/usr/share/logstash/conf.d/*.conf
              </div>
              <div>&nbsp;&nbsp;&nbsp;path.logs:&nbsp;/var/log/logstash</div>
            </div>
          </div>
        </div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>
          <div>
            <div>
              <div>logstash conf.d/xx.conf&nbsp;&nbsp;</div>
              <div>
                <div>
                  <div>&nbsp;&nbsp;&nbsp;input&nbsp;{</div>
                  <div>&nbsp; &nbsp;&nbsp;&nbsp;#&nbsp;beats&nbsp;{</div>
                  <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;&nbsp;&nbsp;port&nbsp;=&gt;&nbsp;5044
                  </div>
                  <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;&nbsp;&nbsp;codec&nbsp;=&gt;&nbsp;"json"
                  </div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;}</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rabbitmq&nbsp;{</div>
                  <div>
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;host&nbsp;=&gt;&nbsp;"192.168.5.130"&nbsp;&nbsp;&nbsp;&nbsp;#RabbitMQ-IP地址
                  </div>
                  <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;vhost&nbsp;=&gt;&nbsp;"wanzhuang"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#虚拟主机
                  </div>
                  <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;port&nbsp;=&gt;&nbsp;5672&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#端口号
                  </div>
                  <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;user&nbsp;=&gt;&nbsp;"admin"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#用户名
                  </div>
                  <div>
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password&nbsp;=&gt;&nbsp;"wagnzhuang.SocketMultiple"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#密码
                  </div>
                  <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;queue&nbsp;=&gt;&nbsp;"LogQueue"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#队列
                  </div>
                  <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;durable&nbsp;=&gt;&nbsp;true&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#持久化跟队列配置一致
                  </div>
                  <div>
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;exchange&nbsp;=&gt;"wz"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#交换机
                  </div>
                  <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;codec&nbsp;=&gt;&nbsp;"json"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#格式
                  </div>
                  <div>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;}</div>
                  <div>&nbsp;&nbsp;&nbsp;}</div>
                  <div>&nbsp;&nbsp;&nbsp;output&nbsp;{</div>
                  <div>&nbsp; &nbsp;&nbsp;&nbsp;elasticsearch&nbsp;{&nbsp;</div>
                  <div>
                    &nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;hosts&nbsp;=&gt;&nbsp;["192.168.5.130:9200"]&nbsp;
                  </div>
                  <div>
                    &nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;index&nbsp;=&gt;&nbsp;"logstash-rabbitmq"
                  </div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div>
                  <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stdout&nbsp;{&nbsp;codec&nbsp;=&gt;&nbsp;rubydebug&nbsp;}
                  </div>
                  <div>&nbsp;&nbsp;&nbsp;}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>
          <div>
            <div>
              filebeat.yml<br />
              <div>
                <div>&nbsp;&nbsp;&nbsp;filebeat.config:</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;modules:</div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;path:&nbsp;${path.config}/modules.d/*.yml
                </div>
                <div>
                  &nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;reload.enabled:&nbsp;false
                </div>
                <br />
                <div>&nbsp;&nbsp;&nbsp;filebeat.autodiscover:</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;providers:</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;type:&nbsp;docker</div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hints.enabled:&nbsp;true
                </div>
                <br />
                <div>&nbsp;&nbsp;&nbsp;processors:</div>
                <div>&nbsp;&nbsp;&nbsp;-&nbsp;add_cloud_metadata:&nbsp;~</div>
                <br />
                <div>&nbsp;&nbsp;&nbsp;filebeat.inputs:</div>
                <div>&nbsp;&nbsp;&nbsp;-&nbsp;type:&nbsp;log</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled:&nbsp;true</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;paths:</div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;/var/log/wz/*.log*
                </div>
                <br />
                <div>&nbsp;&nbsp;&nbsp;output.logstash:</div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hosts:&nbsp;['192.168.5.130:5044']
                </div>
              </div>
            </div>
            <div>
              <div>&nbsp;&nbsp;&nbsp;</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <helperRightNav v-model:rightNavList="info.rightNavList"></helperRightNav>
  <!-- <div class="helper-right-nav">
    <ul>
      <li v-for="(nav, index) in info.rightNavList" :key="nav.text">
        <a
          :href="nav.href"
          :name="'#' + nav.text"
          :class="index == 0 ? 'active' : ''"
          >{{ nav.text }}</a
        >
      </li>
    </ul>
  </div> -->
</template>
<script lang="ts">
import { defineComponent, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import "@/styles/helper.scss";
import helperRightNav from "@/components/Helper/helperRightNav.vue";

export default defineComponent({
  components: {
    helperRightNav,
  },
  setup() {
    const route = useRoute();
    const info = reactive({
      rightNavList: [
        {
          href: `${route.path}#模拟器服务环境`,
          text: "模拟器服务环境",
        },
        {
          href: `${route.path}#模拟器服务运行`,
          text: "模拟器服务运行",
        },
        {
          href: `${route.path}#模拟器日志收集`,
          text: "模拟器日志收集",
        },
        {
          href: `${route.path}#配置文件`,
          text: "配置文件",
        },
      ],
    });   
    return {
      info,
    };
  },
});
</script>
<style lang="scss" scoped>
</style>
