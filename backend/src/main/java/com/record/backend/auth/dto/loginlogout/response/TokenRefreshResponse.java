package com.record.backend.auth.dto.loginlogout.response;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class TokenRefreshResponse {
	private String accessToken;
	private String refreshToken;
	private String tokenType = "Bearer";

	public TokenRefreshResponse(String accessToken, String refreshToken) {
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
	}
}
