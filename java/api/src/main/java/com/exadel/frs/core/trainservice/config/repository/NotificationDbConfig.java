package com.exadel.frs.core.trainservice.config.repository;

import com.impossibl.postgres.jdbc.PGDataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class NotificationDbConfig {

    @Autowired
    private Environment env;

    @Bean(name = "dsPgNot")
    public PGDataSource pgNotificationDatasource() {
        PGDataSource dataSource = new PGDataSource();

        String dbUrl = env.getProperty("spring.datasource-pg.url");
        String dbUsername = env.getProperty("spring.datasource-pg.username");
        String dbPassword = env.getProperty("spring.datasource-pg.password");

        //String databaseUrl = "jdbc:pgsql" + dbUrl.substring(15);

        //dataSource.setDatabaseUrl(databaseUrl);
        dataSource.setHost("my-release-postgresql-ha-pgpool:5432");
        dataSource.setPort(5432);
        dataSource.setUser(dbUsername);
        dataSource.setPassword(dbPassword);
        dataSource.setDatabaseName("postgres");
        dataSource.setHousekeeper(false);
        return dataSource;
    }
}
