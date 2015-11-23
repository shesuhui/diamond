package com.shesuhui.diamond.util;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;

public class ObjectMappingCustomer extends ObjectMapper {
	private static final long serialVersionUID = 1L;

	public ObjectMappingCustomer() {
		configure(JsonParser.Feature.ALLOW_SINGLE_QUOTES, true);

		configure(JsonGenerator.Feature.QUOTE_NON_NUMERIC_NUMBERS, true);

		getSerializerProvider().setNullValueSerializer(new JsonSerializer() {
			public void serialize(Object value, JsonGenerator jg, SerializerProvider sp)
					throws IOException, JsonProcessingException {
				jg.writeString("");
			}
		});
	}
}