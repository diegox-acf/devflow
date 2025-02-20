import { ActionResponse } from "@/types/global";
import logger from "../logger";
import handleError from "./error";
import { RequestError } from "../http-errors";

interface FetchOptions extends RequestInit {
  timeout?: number;
}

/**
 * Checks if the given value is an instance of the built-in Error class.
 *
 * @param error - The value to check.
 *
 * @returns True if the value is an instance of the built-in Error class, false otherwise.
 */
function isError(error: unknown): error is Error {
  return error instanceof Error;
}

/**
 * Performs a fetch request to the given URL with the given options.
 *
 * It uses the given options to configure the request, and returns a promise that resolves
 * to the JSON response from the server. If the request times out, it rejects the promise with
 * an error. If the request fails for any other reason, it rejects the promise with an
 * instance of the RequestError class.
 *
 * @param url - The URL to fetch.
 * @param options - The options to use when making the request.
 *
 * @returns A promise that resolves to the response from the server, or rejects with an
 *          instance of the RequestError class.
 */
export async function fetchHandler<T>(
  url: string,
  options: FetchOptions = {}
): Promise<ActionResponse<T>> {
  const {
    timeout = 5000,
    headers: customHeaders = {},
    ...restOptions
  } = options;
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const headers: HeadersInit = { ...defaultHeaders, ...customHeaders };
  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);
    clearTimeout(timeoutId);
    if (!response.ok) {
      throw new RequestError(response.status, `HTTP error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    const errorResponse = isError(error) ? error : new Error("Unknown Error");
    if (errorResponse.name === "AbortError") {
      logger.warn(`Request to ${url} timed out.`);
    } else {
      logger.error(`Error fetching ${url}: ${errorResponse.message}`);
    }
    return handleError(error) as ActionResponse<T>;
  }
}
