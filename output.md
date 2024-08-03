```mermaid
sequenceDiagram
participant service as ServiceImpl.java
participant repository as Repository.java
participant test as Test.java
service ->>+ repository: find records by TestModel <br>from repository <br>(testModel : TestModel, <br>testModel2 : TestModel)
repository ->>+ test: test <br>(testModel : TestModel)
test ->>+ test2: test2 <br>(testModel : TestModel)
test ->> test: testRecursive <br>(testModel : TestModel)
test -->>- repository: return test
repository -->>- service: return records
```