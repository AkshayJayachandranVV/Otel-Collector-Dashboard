//  docker run --rm -v "$(pwd)/otel-collector-config.yaml:/otel-local-config.yaml" -p 4318:4318 -p 8889:8889 otel/opentelemetry-collector:latest --config otel-local-config.yaml



//docker run --rm --name otel-collector --network otel-net -p 4318:4318 -p 8889:8889   -v $(pwd)/otel-collector-config.yaml:/etc/otel/config.yaml   otel/opentelemetry-collector:latest   --config /etc/otel/config.yaml



// docker run --rm --network otel-net --name prometheus   -p 9090:9090   -v $(pwd)/prometheus.yml:/etc/prometheus/prometheus.yml   prom/prometheus



//docker run -d -p 3100:3000 --name=grafana grafana/grafana-oss
