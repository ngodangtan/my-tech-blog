---
title: "Introduction to Swift — Apple's Modern Programming Language"
date: "2026-04-07"
description: "A practical introduction to Swift — the fast, safe, and expressive language behind iOS, macOS, and beyond."
tags: ["Swift", "iOS", "Tutorial"]
---

## What is Swift?

Swift is a general-purpose programming language developed by Apple and released in 2014. It was designed to replace Objective-C as the primary language for building apps on Apple platforms — iOS, macOS, watchOS, and tvOS.

Today, Swift is also used on the server (via frameworks like Vapor) and even on Linux and Windows. It's open source, actively developed, and consistently ranks among the most loved languages in developer surveys.

## Why Swift?

Three words: **fast, safe, expressive**.

- **Fast** — Swift compiles to native machine code and rivals C++ in performance benchmarks.
- **Safe** — the type system and optionals eliminate entire categories of bugs (null pointer crashes, anyone?).
- **Expressive** — clean syntax with closures, generics, and pattern matching that make code a pleasure to write.

## Your First Swift Program

```swift
print("Hello, World!")
```

That's it. No boilerplate, no `main` class, no imports.

## Variables and Constants

```swift
var mutableValue = 42       // can change
let constantValue = "Swift" // cannot change

mutableValue = 100          // ✅ OK
// constantValue = "Rust"   // ❌ compile error
```

Use `let` by default. Switch to `var` only when you need to mutate. The compiler will even warn you if a `var` was never mutated.

## Types and Type Inference

Swift is statically typed, but the compiler infers types so you rarely need to write them explicitly:

```swift
let name = "Felix"        // String
let age = 28              // Int
let pi = 3.14159          // Double
let isSwiftFun = true     // Bool
```

You can annotate explicitly when it helps readability:

```swift
let score: Int = 0
let greeting: String = "Hello"
```

## Optionals — Handling the Absence of a Value

One of Swift's most distinctive features is **optionals** — a type-safe way to express "this value might not exist."

```swift
var username: String? = nil   // optional String — might be nil

username = "ngodangtan"

if let name = username {
    print("Hello, \(name)!")  // safely unwrapped
} else {
    print("No username set.")
}
```

No more null pointer exceptions. If you try to force-unwrap a nil optional (`username!`) and it's nil, you get a clear crash with a useful message — not silent undefined behavior.

## Functions

```swift
func greet(name: String, times: Int = 1) -> String {
    return Array(repeating: "Hello, \(name)!", count: times).joined(separator: " ")
}

print(greet(name: "Swift"))           // Hello, Swift!
print(greet(name: "Swift", times: 3)) // Hello, Swift! Hello, Swift! Hello, Swift!
```

Swift functions use argument labels by default, which makes call sites read like English sentences.

## Closures

Closures are self-contained blocks of functionality — similar to lambdas in other languages:

```swift
let numbers = [5, 2, 8, 1, 9, 3]

let sorted = numbers.sorted { $0 < $1 }
print(sorted) // [1, 2, 3, 5, 8, 9]

let doubled = numbers.map { $0 * 2 }
print(doubled) // [10, 4, 16, 2, 18, 6]

let evens = numbers.filter { $0 % 2 == 0 }
print(evens) // [2, 8]
```

## Structs and Classes

Swift has both structs (value types) and classes (reference types). Prefer structs by default — they're safer and work better with Swift's ownership model.

```swift
struct Point {
    var x: Double
    var y: Double

    func distanceTo(_ other: Point) -> Double {
        let dx = x - other.x
        let dy = y - other.y
        return (dx * dx + dy * dy).squareRoot()
    }
}

let origin = Point(x: 0, y: 0)
let target = Point(x: 3, y: 4)
print(origin.distanceTo(target)) // 5.0
```

## Enums with Associated Values

Swift enums are far more powerful than in most languages:

```swift
enum NetworkResult {
    case success(data: Data)
    case failure(error: Error)
    case loading
}

func handle(_ result: NetworkResult) {
    switch result {
    case .success(let data):
        print("Got \(data.count) bytes")
    case .failure(let error):
        print("Error: \(error.localizedDescription)")
    case .loading:
        print("Still loading...")
    }
}
```

## Async/Await — Modern Concurrency

Swift 5.5 introduced native async/await, making asynchronous code as readable as synchronous code:

```swift
func fetchUser(id: Int) async throws -> User {
    let url = URL(string: "https://api.example.com/users/\(id)")!
    let (data, _) = try await URLSession.shared.data(from: url)
    return try JSONDecoder().decode(User.self, from: data)
}

// Call it:
Task {
    do {
        let user = try await fetchUser(id: 1)
        print("Hello, \(user.name)!")
    } catch {
        print("Failed: \(error)")
    }
}
```

No more callback pyramids or Combine chains for simple async work.

## Protocol-Oriented Programming

Swift favors protocols over inheritance. A protocol defines a contract — any type that conforms to it must implement the requirements:

```swift
protocol Describable {
    var description: String { get }
}

struct Dog: Describable {
    let name: String
    var description: String { "Dog named \(name)" }
}

struct Car: Describable {
    let model: String
    var description: String { "Car: \(model)" }
}

func printDescription(_ item: any Describable) {
    print(item.description)
}

printDescription(Dog(name: "Rex"))  // Dog named Rex
printDescription(Car(model: "Tesla")) // Car: Tesla
```

## SwiftUI — Declarative UI

If you're building iOS apps, you'll quickly meet SwiftUI — Apple's modern UI framework built entirely in Swift:

```swift
import SwiftUI

struct ContentView: View {
    @State private var count = 0

    var body: some View {
        VStack {
            Text("Count: \(count)")
                .font(.largeTitle)
            Button("Tap me") {
                count += 1
            }
            .buttonStyle(.borderedProminent)
        }
    }
}
```

Reactive, composable, and previews in Xcode update in real time.

## Where to Go Next

- **[Swift.org](https://swift.org)** — official documentation and language reference
- **The Swift Programming Language** — Apple's free book (available in Books app)
- **[100 Days of SwiftUI](https://www.hackingwithswift.com/100/swiftui)** — Paul Hudson's free course
- **Swift forums** — `forums.swift.org` for evolution proposals and community discussion

Swift is a language that rewards you as you go deeper. Start with the basics, build something small, and the rest follows naturally.
