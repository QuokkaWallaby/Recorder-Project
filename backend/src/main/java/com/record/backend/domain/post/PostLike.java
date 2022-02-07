package com.record.backend.domain.post;

import static javax.persistence.FetchType.*;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.record.backend.domain.User;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class PostLike {
	@Id
	@GeneratedValue
	private Long id;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "post_id")
	private Post post;
}
