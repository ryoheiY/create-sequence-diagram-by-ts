```mermaid
sequenceDiagram
participant service as ServiceImpl.java
participant repository as Repository.java
participant test as Test.java
service ->>+ repository: findByTestModel <br>(testModel : TestModel, <br>testModel2 : TestModel)
Note over service,repository: find records by TestModel <br>from repository
repository ->>+ test: testMethod <br>(testModel : TestModel)
Note over repository,test: test説明です
test ->>+ test2: test2 <br>(testModel : TestModel)
test2 -->>- test: return test2
test ->> test: testRecursive <br>(testModel : TestModel)
test -->>- repository: return test
repository ->>+ test: testMethod <br>(testModel : TestModel)
Note over repository,test: test説明です
test ->>+ test2: test2 <br>(testModel : TestModel)
test2 -->>- test: return test2
test ->> test: testRecursive <br>(testModel : TestModel)
test -->>- repository: return test
repository -->>- service: return records
```