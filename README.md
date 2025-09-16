# Deferred Execution Helper (NestJS)

A lightweight helper (mini-library) for convenient **deferred execution of code** on another server.

---

## Requirements

- **Environment:** NestJS  
- **Message broker:** e.g. RabbitMQ (the choice of broker is not critical)

---

## Capabilities

- Invoke any class (provider) registered in the Nest container (anything declared in your modules).
- Pass arbitrary data (e.g., `id`, `newName`) to the execution context.

---

## Example Usage

```ts
runLater((XXX, context) => {
  YYY.UserRepository.update(id, { name: newName });
});
```

