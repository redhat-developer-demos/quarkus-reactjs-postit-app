package org.eclipse.chedemos;

import java.util.Date;
import java.util.Objects;

import io.quarkus.mongodb.panache.MongoEntity;
import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
@MongoEntity(collection = "Posts")
public class Post extends PanacheMongoEntity {
    private String title;
    private String content;
    private long timestamp;

    public Post() {
    }

    public Post(String title, String content) {
        this.title = title;
        this.content = content;
        this.timestamp = new Date().getTime();
    }

    public String getTitle() {
        return title.toUpperCase();
    }

    public String getContent() {
        return content;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Post)) {
            return false;
        }
        Post other = (Post) obj;

        return Objects.equals(this.title, other.title) && Objects.equals(this.content, other.content)
                && Objects.equals(this.timestamp, other.timestamp);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.title, this.content, this.timestamp);
    }
}