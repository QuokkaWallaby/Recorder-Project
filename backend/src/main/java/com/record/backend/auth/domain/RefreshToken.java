// package com.record.backend.auth.domain;
//
// import java.time.Instant;
//
// import javax.persistence.CascadeType;
// import javax.persistence.Column;
// import javax.persistence.Entity;
// import javax.persistence.GeneratedValue;
// import javax.persistence.GenerationType;
// import javax.persistence.Id;
// import javax.persistence.JoinColumn;
// import javax.persistence.OneToOne;
//
// import com.record.backend.domain.user.User;
//
// import lombok.Getter;
// import lombok.Setter;
//
// @Getter @Setter
// @Entity(name = "refreshtoken")
// public class RefreshToken {
// 	@Id @GeneratedValue(strategy = GenerationType.AUTO)
// 	private Long id;
//
// 	@OneToOne(cascade = CascadeType.ALL)
// 	@JoinColumn(name = "user_id", referencedColumnName = "id")
// 	private User user;
//
// 	@Column(nullable = false, unique = true)
// 	private String token;
//
// 	@Column(nullable = false)
// 	private Instant expiryDate;
//
// }
