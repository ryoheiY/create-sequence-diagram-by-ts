# 概要

YAMLファイルの設定を元にMermaid記法のシーケンス図を作成する。<br>
現状同期シーケンスしか実装しておらず、Loopや分岐処理などは未実装。

# build

~~~
npm install
tsc
~~~

# execute

~~~
node dist/main.js
~~~

# examples

## full

~~~yaml
classes:
  - name: ServiceImpl.java
    alias: service
  - name: Repository.java
    alias: repository
  - name: Test.java
    alias: test
flows:
  - type: arrow
    from: service
    to: repository
    action: findByTestModel
    description: find records by TestModel <br>from repository
    returnmsg: return records
    args:
      - type: TestModel
        name: testModel
      - type: TestModel
        name: testModel2
  - type: arrow
    from: repository
    to: test
    action: testMethod
    description: test説明です
    returnmsg: 'return test'
    args:
      - type: TestModel
        name: testModel
~~~

## classes

ライフライン作成用に内部的に使用される設定。

~~~yaml
classes:
  - name: ServiceImpl.java
    alias: service
  - name: Repository.java
    alias: repository
  - name: Test.java
    alias: test
~~~

| name          | alias      |
|---------------|------------|
| lifeline name | alias name |

## flows

returnのシーケンスは、Stackをもとに自動的に付与される。

~~~yaml
flows:
  - type: arrow #arrowは同期処理を示す。
    from: service #from object
    to: repository #to object
    action: findByTestModel # method name
    description: find records by TestModel <br>from repository # display description message
    returnmsg: return records # display return message
    args: # arguments for method
      - type: TestModel
        name: testModel
      - type: TestModel
        name: testModel2
  - type: arrow
    from: repository
    to: test
    action: testMethod
    description: test説明です
    returnmsg: 'return test'
    args:
      - type: TestModel
        name: testModel
  - type: arrow
    from: test
    to: test2
    action: test2
    returnmsg: 'return test2'
    args:
      - type: TestModel
        name: testModel
  - type: arrow
    from: test
    to: test
    action: testRecursive
    args:
      - type: TestModel
        name: testModel
~~~

~~~mermaid
sequenceDiagram
    participant service as ServiceImpl.java
    participant repository as Repository.java
    participant test as Test.java
    service ->>+ repository: findByTestModel <br>(testModel : TestModel, <br>testModel2 : TestModel)
    Note over service, repository: find records by TestModel <br>from repository
    repository ->>+ test: testMethod <br>(testModel : TestModel)
    Note over repository, test: test説明です
    test ->>+ test2: test2 <br>(testModel : TestModel)
    test2 -->>- test: return test2
    test ->> test: testRecursive <br>(testModel : TestModel)
    test -->>- repository: return test
    repository -->>- service: return records
~~~
