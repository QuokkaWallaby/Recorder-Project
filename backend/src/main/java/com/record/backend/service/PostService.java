package com.record.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.record.backend.domain.category.Category;
import com.record.backend.domain.post.Post;
import com.record.backend.domain.user.User;
import com.record.backend.dto.category.response.PostUserByCategory;
import com.record.backend.dto.post.request.PostSaveRequestDto;
import com.record.backend.dto.post.request.PostUpdateRequestDto;
import com.record.backend.dto.post.response.PostAllUsersResponseDto;
import com.record.backend.dto.post.response.PostUpdateResponseDto;
import com.record.backend.exception.ResourceNotFoundException;
import com.record.backend.repository.CategoryRepository;
import com.record.backend.repository.PostRepository;
import com.record.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class PostService {

	private final PostRepository postRepository;
	private final CategoryRepository categoryRepository;
	private final UserRepository userRepository;

	//생성
	@Transactional
	public Post savePost(PostSaveRequestDto requestDto) {
		User user = userRepository.findById(requestDto.getUserId()).get();
		Category category = categoryRepository.findById(requestDto.getCategoryId()).get();
		requestDto.setUser(user);
		requestDto.setCategory(category);

		return postRepository.save(requestDto.toEntity());
	}

	//수정
	@Transactional
	public PostUpdateResponseDto updatePost(Long postId, PostUpdateRequestDto updateDto) {

		postRepository.findById(postId).orElseThrow(
			() -> new ResourceNotFoundException("Post", "id", postId)
		);

		Post findPost = postRepository.findById(postId).get();
		findPost.setTitle(updateDto.getTitle());
		findPost.setContent(updateDto.getTitle());
		findPost.setExposure(updateDto.getExposure());
		findPost.setThumbnail_image(updateDto.getThumbnailImage());
		findPost.setCategory(updateDto.getCategory());
		return new PostUpdateResponseDto(findPost.getId(),findPost.getCategory().getId(), findPost.getTitle(),
			findPost.getContent(), findPost.getSummary(), findPost.getThumbnail_image());
	}

	//조회
	public List<PostAllUsersResponseDto> findUsersAllPosts() {
		List<Post> allPost = postRepository.findAll();
		List<PostAllUsersResponseDto> collect = allPost.stream()
			.map(PostAllUsersResponseDto::new)
			.collect(Collectors.toList());

		return collect;
	}

	public List<PostUserByCategory> findUserCateogryPosts(Long userId, Long categoryId) {
		return null;
	}

	public List<PostAllUsersResponseDto> findUserAllPosts(Long userId) {

		return postRepository.findAllByUserId(userId)
			.stream()
			.map(PostAllUsersResponseDto::new)
			.collect(Collectors.toList());
	}

	//삭제
	@Transactional
	public void deletePost(Long postId) {
		postRepository.deleteById(postId);
	}

	// public Post getPostById(Long postId, UserPrincipal currentUser) {
	// 	Post findPost = postRepository.findById(postId).orElseThrow(
	// 		() -> new ResourceNotFoundException("Post", "id", postId)
	// 	);
	//
	// 	return findPost;
	// }

	public PostAllUsersResponseDto getPostById(Long postId) {
		Post findPost = postRepository.findById(postId).get();
		return new PostAllUsersResponseDto(findPost);
	}



}
