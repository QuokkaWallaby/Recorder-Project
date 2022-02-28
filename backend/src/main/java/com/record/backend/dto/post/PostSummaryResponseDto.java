package com.record.backend.dto.post;

import com.record.backend.domain.comment.Comment;
import com.record.backend.domain.post.Exposure;
import com.record.backend.domain.post.Post;
import com.record.backend.domain.post.PostLike;
import com.record.backend.domain.post.PostTag;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class PostSummaryResponseDto {

    private Long post_id;
    private Long user_id;
    private String user_nickname;
    private byte[] user_profile_photo;
    private String title;
    private String summary;
    private int hits;
    private Exposure exposure;
    private List<PostLike> postLikes;
    private List<PostTag> postTags;

    public PostSummaryResponseDto(Post entity) {
        this.post_id = entity.getId();
        this.user_id = entity.getUser().getId();
        this.user_nickname = entity.getUser().getNickname();
        this.user_profile_photo = entity.getUser().getProfile_photo();
        this.title = entity.getTitle();
        this.summary = entity.getSummary();
        this.hits = entity.getHits();
        this.exposure = entity.getExposure();
        this.postLikes = entity.getPostLikes();
        this.postTags = entity.getPostTags();
    }
}
